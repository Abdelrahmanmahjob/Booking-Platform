import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types";
import Cookies from "js-cookie";

// ============================================
// STATE INTERFACE
// ============================================

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ============================================
// INITIAL STATE
// ============================================

const getInitialToken = (): string | null => {
  if (typeof window === "undefined") return null;

  return Cookies.get("auth_token") || null;
};

const getInitialUser = (): User | null => {
  if (typeof window === "undefined") return null;

  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  user: getInitialUser(),
  token: getInitialToken(),
  isAuthenticated: !!getInitialToken(),
  isLoading: false,
};

// ============================================
// SLICE
// ============================================

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      Cookies.set("auth_token", action.payload.token, {
        expires: 7, // 7 days
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      Cookies.remove("auth_token");
      localStorage.removeItem("user");
    },

    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;

      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { login, logout, updateUser, setLoading } = authSlice.actions;

export default authSlice.reducer;

// ============================================
// SELECTORS
// ============================================

import type { RootState } from "@/store";

// Basic selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;

export const selectUserRole = (state: RootState) => {
  return state.auth.user?.role || null;
};

export const selectIsClient = (state: RootState) => {
  return state.auth.user?.role === "client";
};

export const selectIsProvider = (state: RootState) => {
  return state.auth.user?.role === "provider";
};

export const selectIsProviderProfileComplete = (state: RootState) => {
  const user = state.auth.user;

  if (!user || user.role !== "provider") return false;

  return (
    !!user.businessName &&
    !!user.workingHours &&
    !!user.workingHours.start &&
    !!user.workingHours.end &&
    user.workingDays.length > 0 &&
    user.serviceCategories.length > 0
  );
};
