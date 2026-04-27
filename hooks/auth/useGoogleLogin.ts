"use client";

import { useMutation } from "@tanstack/react-query";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAppDispatch } from "@/lib/hooks";
import { login } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import type { User } from "@/types";

export function useGoogleLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });

      // Use popup instead of redirect — no full page reload
      const result = await signInWithPopup(auth, provider);

      const userDocRef = doc(db, "users", result.user.uid);
      const userDoc = await getDoc(userDocRef);

      let userData: User;

      if (!userDoc.exists()) {
        // New user — create profile in Firestore
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
        userData = userDoc.data() as User;
      }

      const token = await result.user.getIdToken();

      return { user: userData, token };
    },

    onSuccess: (data) => {
      // Save to Redux
      dispatch(login({ user: data.user, token: data.token }));

      // Redirect based on role
      if (data.user.role === "provider") {
        router.push("/provider/dashboard");
      } else {
        router.push("/services");
      }
    },

    onError: (error: any) => {
      // Don't log if user just closed the popup
      if (error.code === "auth/popup-closed-by-user") return;
      console.error("Google login failed:", error.message);
    },
  });
}
