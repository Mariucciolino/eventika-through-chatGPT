import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Trash2, Plus, Edit2, Check, X, LogIn } from 'lucide-react';
import { getLoginUrl } from '@/const';

export default function CalendarAdmin() {
  // All hooks MUST be at the top before any conditional returns
  const utils = trpc.useUtils();
  const { data: user, isLoading: userLoading } = trpc.auth.me.useQuery();
  const { data: bookedDatesData, refetch } = trpc.calendar.getBookedDatesAdmin.useQuery();
  const addMutation = trpc.calendar.addBookedDate.useMutation();
  const removeMutation = trpc.calendar.removeBookedDate.useMutation();
  const updateMutation = trpc.calendar.updateBookedDate.useMutation();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [note, setNote] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editNote, setEditNote] = useState('');

  // Check if user is authenticated (AFTER all hooks)
  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="p-8 max-w-md text-center">
          <LogIn className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Authentication Required</h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in as the owner to access the calendar admin.
          </p>
          <a
            href={getLoginUrl()}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <LogIn className="h-4 w-4" />
            Login to Continue
          </a>
        </Card>
      </div>
    );
  }

  const bookedDates = bookedDatesData || [];

  const handleAddDate = async () => {
    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }

    // Format date in local timezone to avoid timezone conversion bugs
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    try {
      await addMutation.mutateAsync({ date: dateStr, note });
      toast.success('Date marked as booked');
      setSelectedDate(undefined);
      setNote('');
      // Invalidate both admin and public calendar queries
      await utils.calendar.getBookedDatesAdmin.invalidate();
      await utils.calendar.getBookedDates.invalidate();
    } catch (error: any) {
      toast.error(error.message || 'Failed to add booked date');
    }
  };

  const handleRemoveDate = async (date: string) => {
    try {
      await removeMutation.mutateAsync({ date });
      toast.success('Date removed from booked dates');
      // Invalidate both admin and public calendar queries
      await utils.calendar.getBookedDatesAdmin.invalidate();
      await utils.calendar.getBookedDates.invalidate();
    } catch (error: any) {
      toast.error(error.message || 'Failed to remove date');
    }
  };

  return (
    <div className="container max-w-6xl py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-primary">Booking Calendar Management</h1>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">Logged in as:</span>
            <span className="font-bold text-primary">{user?.name}</span>
          </div>
          <div className="text-xs text-gray-500 font-mono">
            Your OpenID: {user?.openId || 'Not available'}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add New Booked Date */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Mark Date as Booked</h2>
          
          <div className="space-y-4">
            <div>
              <Label>Select Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border mt-2"
              />
            </div>

            <div>
              <Label htmlFor="note">Booking Name (max 12 characters)</Label>
              <Input
                id="note"
                placeholder="e.g., Smith"
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, 12))}
                maxLength={12}
                className="mt-2"
              />
            </div>

            <Button 
              onClick={handleAddDate}
              disabled={!selectedDate || addMutation.isPending}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              {addMutation.isPending ? 'Adding...' : 'Mark as Booked'}
            </Button>
          </div>
        </Card>

        {/* List of Booked Dates */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Booked Dates</h2>
          
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {bookedDates.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No booked dates yet</p>
            ) : (
              bookedDates
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{new Date(booking.date).toLocaleDateString('sv-SE')}</p>
                      {editingId === booking.id ? (
                        <div className="flex items-center gap-2 mt-2">
                          <Input
                            value={editNote}
                            onChange={(e) => setEditNote(e.target.value.slice(0, 12))}
                            maxLength={12}
                            placeholder="Booking name"
                            className="h-8 text-sm"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={async () => {
                              try {
                                await updateMutation.mutateAsync({
                                  date: booking.date,
                                  note: editNote
                                });
                                toast.success('Booking name updated');
                                setEditingId(null);
                                // Invalidate both admin and public calendar queries
                                await utils.calendar.getBookedDatesAdmin.invalidate();
                                await utils.calendar.getBookedDates.invalidate();
                              } catch (error: any) {
                                toast.error(error.message || 'Failed to update');
                              }
                            }}
                          >
                            <Check className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setEditingId(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-muted-foreground">
                            {booking.note || 'No name'}
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => {
                              setEditingId(booking.id);
                              setEditNote(booking.note || '');
                            }}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveDate(booking.date)}
                      disabled={removeMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
