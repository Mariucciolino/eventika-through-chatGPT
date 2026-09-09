import { useEffect, useState } from "react";
import { sv, enUS } from "react-day-picker/locale";
import { useBookingAvailability } from "@/hooks/useBookingAvailability";
import { Calendar } from "@/components/ui/calendar";
import { useLanguage } from "@/contexts/LanguageContext";

type BookingCalendarProps = {
  selectedDate?: Date;
  onSelectDate?: (date: Date | undefined) => void;
};

export function BookingCalendar({ selectedDate, onSelectDate }: BookingCalendarProps) {
  const { language } = useLanguage();

  const { bookedDateObjects, isError, isPending } = useBookingAvailability();

  // Control the visible month so navigation always works reliably
  const [month, setMonth] = useState<Date>(() => selectedDate ?? new Date());

  useEffect(() => {
    if (selectedDate) setMonth(selectedDate);
  }, [selectedDate]);

  return (
    <div className="bg-white p-6 rounded-xl border border-border shadow-sm w-full min-w-0 lg:min-w-[380px]">
      <h3 className="text-xl font-bold mb-4 text-primary">
        {language === "sv" ? "Tillgänglighet" : "Availability"}
      </h3>

      <p className="text-sm text-muted-foreground mb-6">
        {language === "sv"
          ? "Datum markerade i rött är redan bokade. Välj ett annat datum för din förfrågan."
          : "Dates marked in red are already booked. Please choose another date for your inquiry."}
      </p>

      {isError && (
        <p role="alert" className="mb-4 rounded-md border border-amber-500 bg-amber-50 p-3 text-sm text-amber-950">
          {language === "sv"
            ? "Tillgängligheten kunde inte hämtas. Kalendern kan sakna bokade datum. Kontakta oss för att bekräfta ditt datum."
            : "Availability could not be loaded. Some booked dates may be missing from the calendar. Please contact us to confirm your date."}
        </p>
      )}
      {isPending && (
        <p role="status" className="mb-4 text-sm text-muted-foreground">
          {language === "sv" ? "Hämtar tillgänglighet…" : "Loading availability…"}
        </p>
      )}
      <Calendar
        mode="single"
        locale={language === "sv" ? sv : enUS}
        weekStartsOn={language === "sv" ? 1 : 0}
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
