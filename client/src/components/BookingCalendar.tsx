import { trpc } from '@/lib/trpc';
import { Calendar } from '@/components/ui/calendar';
import { useLanguage } from '@/contexts/LanguageContext';

type BookingCalendarProps = {
  selectedDate?: Date;
  onSelectDate?: (date: Date | undefined) => void;
};

export function BookingCalendar({ selectedDate, onSelectDate }: BookingCalendarProps) {
  const { language } = useLanguage();
  const { data: bookedDates } = trpc.calendar.getBookedDates.useQuery(undefined, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0, // Always consider data stale, refetch on focus
  });

  const bookedDateObjects = (bookedDates || []).map(dateStr => new Date(dateStr + 'T00:00:00'));

  return (
    <div className="bg-white p-6 rounded-xl border border-border shadow-sm w-full min-w-[360px]">
      <h3 className="text-xl font-bold mb-4 text-primary">
        {language === 'sv' ? 'Tillgänglighet' : 'Availability'}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        {language === 'sv' 
          ? 'Datum markerade i rött är redan bokade. Välj ett annat datum för din förfrågan.'
          : 'Dates marked in red are already booked. Please choose another date for your inquiry.'}
      </p>
   <Calendar
  mode="single"
  selected={selectedDate}
  onSelect={onSelectDate}
  defaultMonth={new Date()}
  disabled={bookedDateObjects}
  className="rounded-md border w-full"
  classNames={{
    root: "w-full",
    months: "w-full",
    month: "w-full",
    table: "w-full table-fixed",
    head_row: "w-full",
    row: "w-full",
    head_cell: "w-10 text-center text-muted-foreground font-normal text-[0.8rem]",
    cell: "w-10 h-10 p-0 text-center",
    day: "w-10 h-10 p-0 font-normal",
  }}
  modifiers={{ booked: bookedDateObjects }}
  modifiersClassNames={{
    booked: "bg-red-100 text-red-800 font-bold hover:bg-red-100 hover:text-red-800 line-through",
  }}
/>
    </div>
  );
}
