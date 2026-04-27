"use client";

import { useLogout } from "@/hooks/auth/useLogout";

export default function TestPage() {
  const { mutate: logout } = useLogout();

  return <button onClick={() => logout()}>Logout</button>;
}
