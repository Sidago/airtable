import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // const res = await fetch(`${process.env.API_URL}/login`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(body),
  // });

  // const data = await res.json();

  // if (!res.ok) {
  //   return NextResponse.json(data, { status: 401 });
  // }

  const user = {
    id: 1,
    name: "John Doe",
    email: "user@example.com",
  };
  const token = "dummy-auth-token";

  const cookieStore = await cookies();

  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return NextResponse.json({ user, token });
}
