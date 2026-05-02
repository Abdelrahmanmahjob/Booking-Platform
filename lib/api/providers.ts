import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import type { Provider } from "@/types";

export const providersApi = {
  // Get provider by ID
  getById: async (providerId: string): Promise<Provider | null> => {
    try {
      const providerDoc = await getDoc(doc(db, "users", providerId));

      if (!providerDoc.exists()) {
        return null;
      }

      const userData = providerDoc.data();

      // Check if user is actually a provider
      if (userData.role !== "provider") {
        return null;
      }

      return {
        id: providerDoc.id,
        ...userData,
      } as Provider;
    } catch (error) {
      console.error("Error fetching provider:", error);
      throw error;
    }
  },

  // Get all providers
  getAll: async (): Promise<Provider[]> => {
    try {
      const q = query(collection(db, "users"), where("role", "==", "provider"));

      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Provider[];
    } catch (error) {
      console.error("Error fetching providers:", error);
      throw error;
    }
  },

  // Update provider profile
  updateProfile: async (
    providerId: string,
    data: Partial<Provider>,
  ): Promise<void> => {
    try {
      const providerRef = doc(db, "users", providerId);
      await updateDoc(providerRef, {
        ...data,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error updating provider:", error);
      throw error;
    }
  },
};
