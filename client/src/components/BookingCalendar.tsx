import { trpc } from '@/lib/trpc';
import { Calendar } from '@/components/ui/calendar';
import { useLanguage } from '@/contexts/LanguageContext';

export function BookingCalendar() {
  const { language } = useLanguage();
  const { data: bookedDates } = trpc.calendar.getBookedDates.useQuery(undefined, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0, // Always consider data stale, refetch on focus
  });

  const bookedDateObjects = (bookedDates || []).map(dateStr => new Date(dateStr + 'T00:00:00'));

  return (
    <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
      <h3 className="text-xl font-bold mb-4 text-primary">
        {language === 'sv' ? 'Tillgänglighet' : 'Availability'}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        {language === 'sv' 
          ? 'Datum markerade i rött är redan bokade. Välj ett annat datum för din förfrågan.'
          : 'Dates marked in red are already booked. Please choose another date for your inquiry.'}
      </p>
      <Calendar
        defaultMonth={new Date()}
        className="rounded-md border w-full [&_table]:w-full [&_table]:table-fixed [--cell-size:3rem]"
        classNames={{
          root: '!w-full',
          month: 'w-full',
          months: 'w-full',
          weekdays: 'flex w-full',
          week: 'flex w-full',
          day: 'flex-1'
        }}
        modifiers={{
          booked: bookedDateObjects
        }}
        modifiersClassNames={{
          booked: 'bg-red-100 text-red-800 font-bold hover:bg-red-100 hover:text-red-800 line-through'
        }}
      />
    </div>
  );
}
