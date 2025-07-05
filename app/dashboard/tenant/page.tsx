"use client";

import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (user.role !== "tenant") {
        router.push("/unauthorized");
      }
    }
  }, [loading, user, router]);

  if (loading) return <p>Loading...</p>;
  if (!user || user.role !== "tenant") return null;

  return (
    <>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Mobile: {user.mobile}</p>
      <p>Role: {user.role}</p>
      <button onClick={logout}>Logout</button>
    </>
  );
}
