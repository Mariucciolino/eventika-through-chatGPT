import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Calendar } from "@/components/ui/calendar";
import { useLanguage } from "@/contexts/LanguageContext";

type BookingCalendarProps = {
  selectedDate?: Date;
  onSelectDate?: (date: Date | undefined) => void;
};

export function BookingCalendar({ selectedDate, onSelectDate }: BookingCalendarProps) {
  const { language } = useLanguage();

  const { data: bookedDates } = trpc.calendar.getBookedDates.useQuery(undefined, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  const bookedDateObjects = (bookedDates || []).map((dateStr) => new Date(`${dateStr}T00:00:00`));

  // Control the visible month so navigation always works reliably
  const [month, setMonth] = useState<Date>(() => selectedDate ?? new Date());

  useEffect(() => {
    if (selectedDate) setMonth(selectedDate);
  }, [selectedDate]);

  return (
    <div className="bg-white p-6 rounded-xl border border-border shadow-sm w-full min-w-[380px]">
      <h3 className="text-xl font-bold mb-4 text-primary">
        {language === "sv" ? "Tillgänglighet" : "Availability"}
      </h3>

      <p className="text-sm text-muted-foreground mb-6">
        {language === "sv"
          ? "Datum markerade i rött är redan bokade. Välj ett annat datum för din förfrågan."
          : "Dates marked in red are already booked. Please choose another date for your inquiry."}
      </p>

      <Calendar
        mode="single"
        month={month}
        onMonthChange={setMonth}
        selected={selectedDate}
        onSelect={onSelectDate}
        disabled={bookedDateObjects}
        className="rounded-md border w-full"
        modifiers={{ booked: bookedDateObjects }}
        modifiersClassNames={{
          booked: "bg-red-100 text-red-800 font-bold hover:bg-red-100 hover:text-red-800 line-through",
        }}
      />
    </div>
  );
}
