"use client";

import { useMutation } from "@tanstack/react-query";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAppDispatch } from "@/lib/hooks";
import { login } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import type { Client } from "@/types";
import { useEffect } from "react";

export function useGoogleLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (!result) return;

        const userDocRef = doc(db, "users", result.user.uid);
        const userDoc = await getDoc(userDocRef);

        let userData: Client;

        if (!userDoc.exists()) {
          userData = {
            id: result.user.uid,
            email: result.user.email!,
            name: result.user.displayName || "User",
            phone: result.user.phoneNumber || "",
            role: "client",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          await setDoc(userDocRef, userData);
        } else {
          userData = userDoc.data() as Client;
        }

        const token = await result.user.getIdToken();
        dispatch(login({ user: userData, token }));

        // Redirect to dashboard
        router.push("/services");
      } catch (error: any) {
        if (error.code !== "auth/popup-closed-by-user") {
          console.error("Google login redirect failed:", error);
        }
      }
    };

    handleRedirectResult();
  }, [dispatch, router]);

  return useMutation({
    mutationFn: async () => {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });
      await signInWithRedirect(auth, provider);
    },
    onError: (error: any) => {
      console.error("Google login failed:", error.message);
    },
  });
}
