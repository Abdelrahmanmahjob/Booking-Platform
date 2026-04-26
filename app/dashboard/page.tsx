"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { login, logout, selectCurrentUser } from "@/store/slices/authSlice";

export default function Dashboard() {
  // 1. قراءة الـ state
  const user = useAppSelector(selectCurrentUser);
  const isLoggedIn = useAppSelector((state) => state.auth.isAuthenticated);

  // 2. إرسال أوامر
  const dispatch = useAppDispatch();

  const handleFakeLogin = () => {
    dispatch(
      login({
        user: {
          id: "1",
          email: "test@example.com",
          name: "Ahmed Test",
          phone: "0512345678",
          role: "client",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        token: "fake-token-123",
      }),
    );
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!isLoggedIn) {
    return (
      <div className="p-8">
        <h1>Not logged in</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-4"
          onClick={handleFakeLogin}
        >
          Fake Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1>Dashboard</h1>
      <p>
        Welcome, {user?.name} ({user?.email})
      </p>
      <button
        className="bg-red-500 text-white px-4 py-2 mt-4"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
