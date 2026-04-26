"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAppDispatch } from "@/lib/hooks";
import { login as setCredentials } from "@/store/slices/authSlice";
import type { LoginInput } from "@/schemas/auth.schema";
import type { User } from "@/types";

export function useLogin() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (credentials: LoginInput) => {
      // 1. Login with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password,
      );

      // 2. Get user data from Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

      if (!userDoc.exists()) {
        throw new Error("User data not found");
      }

      // 3. Get Firebase token
      const token = await userCredential.user.getIdToken();

      return {
        user: userDoc.data() as User,
        token,
      };
    },

    onSuccess: (data) => {
      // Save to Redux
      dispatch(
        setCredentials({
          user: data.user,
          token: data.token,
        }),
      );

      // Redirect based on role
      if (data.user.role === "client") {
        router.push("/services");
      } else if (data.user.role === "provider") {
        router.push("/provider/dashboard");
      }
    },

    onError: (error: any) => {
      console.error("Login failed:", error.message);

      // Firebase error codes
      if (error.code === "auth/wrong-password") {
        console.error("Invalid password");
      } else if (error.code === "auth/user-not-found") {
        console.error("User not found");
      }
    },
  });
}
