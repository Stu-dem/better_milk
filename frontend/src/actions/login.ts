import { setCookie } from "cookies-next/client";
import { getTokenExpiry } from "@/lib/auth/getTokenExpiry";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const options: RequestInit = {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    }
  }

  const tokenResponse = await fetch(
    "http://localhost:8000/api/auth/login/",
    options,
  ).then((res) => res.json());

  if (tokenResponse.error) {
    let errorMessage;

    if (tokenResponse.non_field_errors) {
      errorMessage = tokenResponse.non_field_errors[0];
    }
    return { error: errorMessage };
  }

  const authTokens = JSON.stringify({
    access: tokenResponse.access,
    refresh: tokenResponse.refresh,
    accessTokenExpires: getTokenExpiry("access"),
    refreshTokenExpires: getTokenExpiry("refresh"),
  });

  setCookie("authTokens", authTokens)

  return { success: "Login successful!", user: tokenResponse };
}