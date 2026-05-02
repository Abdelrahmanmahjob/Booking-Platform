// ============================================
// ENUMS & UNIONS
// ============================================

export type UserRole = "client" | "provider";

/**
 * Booking status flow:
 *
 * pending → confirmed → completed
 *   ↓
 * cancelled
 *
 * confirmed → cancelled (can cancel confirmed booking)
 *
 * Rules:
 * - Cannot complete a pending booking
 * - Cannot un-cancel a booking
 * - Cannot confirm a cancelled booking
 */
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type ServiceCategory = "medical" | "fitness" | "education";

export type DayOfWeek =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export type SlotStatus = "available" | "booked" | "blocked";

// ============================================
// CORE INTERFACES
// ============================================

// Working hours structure
export interface WorkingHours {
  start: string; // "09:00" (HH:mm)
  end: string; // "17:00" (HH:mm)
}

// Provider rating details
export interface ProviderRating {
  rating: number; // 0-5 range
  totalReviews: number; // >= 0
}

// ============================================
// USER TYPES
// ============================================

interface BaseUser {
  id: string;
  email: string;
  phone: string;
  name: string;
  role: UserRole;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface Client extends BaseUser {
  role: "client";
}

export interface Provider extends BaseUser {
  role: "provider";
  businessName: string;
  workingHours: WorkingHours;
  workingDays: DayOfWeek[];
  serviceCategories: ServiceCategory[];
  rating: ProviderRating;
  totalBookingsCompleted: number;
}

export type User = Client | Provider;

// ============================================
// SERVICE & BOOKING TYPES
// ============================================

export interface Service {
  id: string;
  providerId: string;
  name: string;
  description: string;
  category: ServiceCategory;
  duration: number; // in minutes
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlot {
  id: string;
  serviceId: string;
  date: string; // "2024-01-15" (YYYY-MM-DD)
  startTime: string; // "09:00" (HH:mm)
  endTime: string; // "10:00" (HH:mm)
  status: SlotStatus;
}

export interface Booking {
  id: string;
  serviceId: string;
  clientId: string;
  providerId: string;
  slotId: string;
  status: BookingStatus;
  date: string;
  time: string;
  notes?: string;
  cancelReason?: string;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
}
