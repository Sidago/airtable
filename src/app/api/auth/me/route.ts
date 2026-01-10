import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json(null, { status: 401 });
  }

  const user = {
    id: 1,
    name: "John Doe",
    email: "user@example.com",
  };

  return NextResponse.json(user);
}
