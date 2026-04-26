"use client";

import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      return { message: "Providers working!" };
    },
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Test Page</h1>
      <p>{data?.message}</p>
    </div>
  );
}
