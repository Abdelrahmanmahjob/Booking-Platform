import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import type { Booking, DayOfWeek } from "@/types";
import { servicesApi } from "./services";
import { providersApi } from "./providers";

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Generate time slots between start and end time
 * @param startTime "09:00"
 * @param endTime "17:00"
 * @param interval minutes (default 30)
 * @returns ["09:00", "09:30", "10:00", ...]
 */
function generateTimeSlots(
  startTime: string,
  endTime: string,
  interval: number = 30,
): string[] {
  const slots: string[] = [];

  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);

  let currentHour = startHour;
  let currentMin = startMin;

  while (
    currentHour < endHour ||
    (currentHour === endHour && currentMin < endMin)
  ) {
    const timeString = `${String(currentHour).padStart(2, "0")}:${String(currentMin).padStart(2, "0")}`;
    slots.push(timeString);

    // Add interval
    currentMin += interval;
    if (currentMin >= 60) {
      currentMin -= 60;
      currentHour += 1;
    }
  }

  return slots;
}

/**
 * Check if a time slot conflicts with existing bookings
 * @param slotTime "09:00"
 * @param serviceDuration 45 minutes
 * @param existingBookings array of bookings for that date
 * @returns true if slot is available, false if booked
 */
function isSlotAvailable(
  slotTime: string,
  serviceDuration: number,
  existingBookings: Booking[],
): boolean {
  const [slotHour, slotMin] = slotTime.split(":").map(Number);
  const slotStart = slotHour * 60 + slotMin; // convert to minutes
  const slotEnd = slotStart + serviceDuration;

  for (const booking of existingBookings) {
    // Skip cancelled bookings
    if (booking.status === "cancelled") continue;

    const [bookingHour, bookingMin] = booking.time.split(":").map(Number);
    const bookingStart = bookingHour * 60 + bookingMin;

    // Get booking duration from service (we need to fetch service or pass duration)
    // For simplicity, assume a standard duration or we can enhance this
    // Let's assume booking has duration info or we use a default
    const bookingEnd = bookingStart + serviceDuration; // simplified

    // Check for overlap
    if (
      (slotStart >= bookingStart && slotStart < bookingEnd) ||
      (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
      (slotStart <= bookingStart && slotEnd >= bookingEnd)
    ) {
      return false; // Slot is booked
    }
  }

  return true; // Slot is available
}

// ============================================
// BOOKINGS API
// ============================================

export const bookingsApi = {
  /**
   * Get all bookings (admin use)
   */
  getAll: async (): Promise<Booking[]> => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Booking[];
  },

  /**
   * Get bookings by provider ID
   */
  getByProvider: async (providerId: string): Promise<Booking[]> => {
    const q = query(
      collection(db, "bookings"),
      where("providerId", "==", providerId),
      orderBy("createdAt", "desc"),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Booking[];
  },

  /**
   * Get bookings by client ID
   */
  getByClient: async (clientId: string): Promise<Booking[]> => {
    const q = query(
      collection(db, "bookings"),
      where("clientId", "==", clientId),
      orderBy("createdAt", "desc"),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Booking[];
  },

  /**
   * Get single booking by ID
   */
  getById: async (id: string): Promise<Booking> => {
    const bookingDoc = await getDoc(doc(db, "bookings", id));

    if (!bookingDoc.exists()) {
      throw new Error("Booking not found");
    }

    return {
      id: bookingDoc.id,
      ...bookingDoc.data(),
    } as Booking;
  },

  /**
   * Get bookings for specific date and service
   */
  getBookingsByDateAndService: async (
    serviceId: string,
    date: string,
  ): Promise<Booking[]> => {
    const q = query(
      collection(db, "bookings"),
      where("serviceId", "==", serviceId),
      where("date", "==", date),
      where("status", "in", ["pending", "confirmed"]),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Booking[];
  },

  /**
   * Get available time slots for a service on a specific date
   */
  getAvailableSlots: async (
    serviceId: string,
    date: string,
  ): Promise<{ time: string; available: boolean }[]> => {
    try {
      const service = await servicesApi.getById(serviceId);
      if (!service) throw new Error("Service not found");

      const provider = await providersApi.getById(service.providerId);
      if (!provider) throw new Error("Provider not found");

      // Check working day
      const dateObj = new Date(date);
      const dayOfWeek = dateObj
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase();

      if (!provider.workingDays.includes(dayOfWeek as DayOfWeek)) {
        return []; // يوم إجازة
      }

      // Generate all slots
      const allSlots = generateTimeSlots(
        provider.workingHours.start,
        provider.workingHours.end,
        service.duration,
      );

      // Get existing bookings
      const existingBookings = await bookingsApi.getBookingsByDateAndService(
        serviceId,
        date,
      );

      // ✅ Return { time, available } بدل strings
      return allSlots.map((time) => ({
        time,
        available: isSlotAvailable(time, service.duration, existingBookings),
      }));
    } catch (error) {
      console.error("Error getting available slots:", error);
      throw error;
    }
  },

  /**
   * Create a new booking
   */
  create: async (
    data: Omit<Booking, "id" | "createdAt" | "updatedAt">,
  ): Promise<Booking> => {
    try {
      const now = new Date().toISOString();

      // Validate slot availability
      const availableSlots = await bookingsApi.getAvailableSlots(
        data.serviceId,
        data.date,
      );

      // ✅ Fix: check time + available
      const isAvailable = availableSlots.some(
        (slot) => slot.time === data.time && slot.available,
      );

      if (!isAvailable) {
        throw new Error("Selected time slot is no longer available");
      }

      const docRef = await addDoc(collection(db, "bookings"), {
        ...data,
        createdAt: now,
        updatedAt: now,
      });

      return {
        id: docRef.id,
        ...data,
        createdAt: now,
        updatedAt: now,
      };
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  },

  /**
   * Update booking status
   */
  updateStatus: async (
    id: string,
    status: Booking["status"],
  ): Promise<void> => {
    try {
      const now = new Date().toISOString();
      const updateData: any = {
        status,
        updatedAt: now,
      };

      // Add timestamp fields based on status
      if (status === "confirmed") {
        updateData.confirmedAt = now;
      } else if (status === "completed") {
        updateData.completedAt = now;
      } else if (status === "cancelled") {
        updateData.cancelledAt = now;
      }

      await updateDoc(doc(db, "bookings", id), updateData);
    } catch (error) {
      console.error("Error updating booking status:", error);
      throw error;
    }
  },

  /**
   * Cancel booking with reason
   */
  cancel: async (id: string, cancelReason?: string): Promise<void> => {
    try {
      const now = new Date().toISOString();

      await updateDoc(doc(db, "bookings", id), {
        status: "cancelled",
        cancelReason: cancelReason || "Cancelled by user",
        cancelledAt: now,
        updatedAt: now,
      });
    } catch (error) {
      console.error("Error cancelling booking:", error);
      throw error;
    }
  },

  /**
   * Delete booking (hard delete)
   */
  delete: async (id: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, "bookings", id));
    } catch (error) {
      console.error("Error deleting booking:", error);
      throw error;
    }
  },

  /**
   * Get upcoming bookings for a client
   */
  getUpcomingByClient: async (clientId: string): Promise<Booking[]> => {
    const today = new Date().toISOString().split("T")[0];

    const q = query(
      collection(db, "bookings"),
      where("clientId", "==", clientId),
      where("date", ">=", today),
      where("status", "in", ["pending", "confirmed"]),
      orderBy("date", "asc"),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Booking[];
  },

  /**
   * Get upcoming bookings for a provider
   */
  getUpcomingByProvider: async (providerId: string): Promise<Booking[]> => {
    const today = new Date().toISOString().split("T")[0];

    const q = query(
      collection(db, "bookings"),
      where("providerId", "==", providerId),
      where("date", ">=", today),
      where("status", "in", ["pending", "confirmed"]),
      orderBy("date", "asc"),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Booking[];
  },

  /**
   * Get bookings count by status for a provider
   */
  getStatsByProvider: async (
    providerId: string,
  ): Promise<{
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  }> => {
    const bookings = await bookingsApi.getByProvider(providerId);

    return {
      total: bookings.length,
      pending: bookings.filter((b) => b.status === "pending").length,
      confirmed: bookings.filter((b) => b.status === "confirmed").length,
      completed: bookings.filter((b) => b.status === "completed").length,
      cancelled: bookings.filter((b) => b.status === "cancelled").length,
    };
  },
};
