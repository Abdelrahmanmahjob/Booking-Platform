import { BookingsClient } from "@/components/bookings/client/bookingsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Bookings | BookIt",
};

export default function MyBookingsPage() {
  return <BookingsClient />;
}
