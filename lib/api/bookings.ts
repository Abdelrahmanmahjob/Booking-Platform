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
import type { Booking } from "@/types";

export const bookingsApi = {
  getAll: async (): Promise<Booking[]> => {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Booking[];
  },

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

  getById: async (id: string): Promise<Booking> => {
    const bookingDoc = await getDoc(doc(db, "bookings", id));

    return {
      id: bookingDoc.id,
      ...bookingDoc.data(),
    } as Booking;
  },

  create: async (
    data: Omit<Booking, "id" | "createdAt" | "updatedAt">,
  ): Promise<Booking> => {
    const now = new Date().toISOString();

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
  },

  updateStatus: async (id: string, status: Booking["status"]) => {
    await updateDoc(doc(db, "bookings", id), {
      status,
      updatedAt: new Date().toISOString(),
    });
  },

  delete: async (id: string) => {
    await deleteDoc(doc(db, "bookings", id));
  },
};
