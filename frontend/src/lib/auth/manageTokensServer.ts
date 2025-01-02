
import { cookies } from "next/headers";

import { UserCredentials } from "@/types/user";

export const getTokens = async () => {

  try {
    const cookieStore = await cookies();
    const tokens = cookieStore.get("authTokens")?.value;
    const userCredentials = JSON.parse(tokens as string);
    return userCredentials;
  } catch (error) {
    console.error("Error getting tokens: ", error);
    return null;
  }
}

export const updateTokens = async (userCredentials: UserCredentials, newTokens: object) => {
  const cookieStore = await cookies();

  const newCredentials = { ...userCredentials, ...newTokens };

  cookieStore.set("authTokens", JSON.stringify(newCredentials), {
    secure: true,
    sameSite: "strict",
  });
}