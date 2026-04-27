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
} from "firebase/firestore";
import type { Service } from "@/types";
import type { ServiceInput } from "@/schemas/service.schema";

export const servicesApi = {
  getAll: async (): Promise<Service[]> => {
    const q = query(collection(db, "services"), where("isActive", "==", true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Service[];
  },

  getById: async (id: string): Promise<Service> => {
    const serviceDoc = await getDoc(doc(db, "services", id));
    return {
      id: serviceDoc.id,
      ...serviceDoc.data(),
    } as Service;
  },

  getByProvider: async (providerId: string): Promise<Service[]> => {
    const servicesCollection = collection(db, "services");
    const querySnapshot = await getDocs(
      query(servicesCollection, where("providerId", "==", providerId)),
    );
    const services = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Service[];
    return services;
  },

  create: async (data: ServiceInput, providerId: string): Promise<Service> => {
    const servicesCollection = collection(db, "services");
    const serviceDoc = await addDoc(servicesCollection, {
      ...data,
      providerId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return {
      id: serviceDoc.id,
      ...data,
      providerId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Service;
  },

  update: async (id: string, data: Partial<ServiceInput>): Promise<void> => {
    const servicesCollection = collection(db, "services");
    const serviceDoc = doc(servicesCollection, id);
    await updateDoc(serviceDoc, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  },

  delete: async (id: string): Promise<void> => {
    const servicesCollection = collection(db, "services");
    const serviceDoc = doc(servicesCollection, id);
    await deleteDoc(serviceDoc);
  },
};
