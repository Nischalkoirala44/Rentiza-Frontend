const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function registerUser(data: { name: string; email: string; mobile: string; password: string, role: "tenant" | "landlord" }) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return res.json();
}

export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  return res.json();
}

export async function getUserDetails() {
  const res = await fetch(`${API_URL}/getUserDetails`, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}

export async function logoutUser() {
  const res = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  return res.json();
}
