import { useMemo } from "react";
import { trpc } from "@/lib/trpc";

const manualBlockedDates = [
  "2026-05-23", "2026-05-30", "2026-08-01", "2026-08-22",
  "2026-08-28", "2026-08-29", "2026-09-05", "2027-06-26",
];

// The calendar and form must validate against the same cached availability.
export function useBookingAvailability() {
  const query = trpc.calendar.getBookedDates.useQuery(undefined, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
  });
  const blockedDates = useMemo(
    () => Array.from(new Set<string>([...manualBlockedDates, ...(query.data ?? [])])),
    [query.data],
  );
  const bookedDateObjects = useMemo(
    () => blockedDates.map(date => new Date(`${date}T00:00:00`)),
    [blockedDates],
  );
  return { blockedDates, bookedDateObjects, isError: query.isError, isPending: query.isPending };
}
