"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAppDispatch } from "@/lib/hooks";
import { logout as clearCredentials } from "@/store/slices/authSlice";

export function useLogout() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async () => {
      await signOut(auth);
    },

    onSuccess: () => {
      dispatch(clearCredentials());
      router.push("/login");
    },
  });
}
