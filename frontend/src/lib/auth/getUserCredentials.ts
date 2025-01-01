import { getCookie } from "cookies-next";

export type UserCredentials = {
  refresh: string;
  access: string;
  accessTokenExpires: string;
  refreshTokenExpires: string;
};

export function getUserCredentials(
  req?: any,
  res?: any
): UserCredentials | null {
  let tokens;
  tokens = getCookie("authTokens");

  if (!tokens) {
    return null;
  }

  try {
    const credentials = JSON.parse(tokens as string) as UserCredentials;
    return credentials;
  } catch (error) {
    console.error("Error parsing tokens:", error);
    return null;
  }
}
