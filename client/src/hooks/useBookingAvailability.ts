// Availability is maintained in GitHub, not fetched from a database.
// Keep one shared list for the calendar and booking-form validation.
const blockedDates = ["2027-06-26", "2028-07-21", "2028-07-28"];
const bookedDateObjects = blockedDates.map(date => new Date(`${date}T00:00:00`));

export function useBookingAvailability() {
  return { blockedDates, bookedDateObjects, isError: false, isPending: false };
}
