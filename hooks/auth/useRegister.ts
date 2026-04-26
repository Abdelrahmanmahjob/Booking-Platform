"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAppDispatch } from "@/lib/hooks";
import { login as setCredentials } from "@/store/slices/authSlice";
import type {
  RegisterClientInput,
  RegisterProviderInput,
} from "@/schemas/auth.schema";
import type { Client, Provider } from "@/types";

export function useRegisterClient() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (input: RegisterClientInput) => {
      // 1. Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password,
      );

      // 2. Create user document في Firestore
      const userData: Client = {
        id: userCredential.user.uid,
        email: input.email,
        name: input.name,
        phone: input.phone,
        role: "client",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", userCredential.user.uid), userData);

      // 3. Get token
      const token = await userCredential.user.getIdToken();

      return { user: userData, token };
    },

    onSuccess: (data) => {
      dispatch(setCredentials(data));
      router.push("/services");
    },

    onError: (error: any) => {
      // console.error("Registration failed:", error.message);
      if (error.code === "auth/email-already-in-use") {
        // console.error("Email already registered");
        return "Email already registered";
      }
      return error.message;
    },
  });
}

export function useRegisterProvider() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (input: RegisterProviderInput) => {
      // 1. Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password,
      );

      // 2. Create provider document
      const userData: Provider = {
        id: userCredential.user.uid,
        email: input.email,
        name: input.name,
        phone: input.phone,
        role: "provider",
        businessName: input.businessName,
        workingHours: input.workingHours,
        workingDays: input.workingDays,
        serviceCategories: input.serviceCategories,
        rating: { rating: 0, totalReviews: 0 },
        totalBookingsCompleted: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", userCredential.user.uid), userData);

      const token = await userCredential.user.getIdToken();

      return { user: userData, token };
    },

    onSuccess: (data) => {
      dispatch(setCredentials(data));
      router.push("/provider/dashboard");
    },

    onError: (error: any) => {
      console.error("Registration failed:", error.message);
      if (error.code === "auth/email-already-in-use") {
        return "Email already registered";
      }
    },
  });
}
