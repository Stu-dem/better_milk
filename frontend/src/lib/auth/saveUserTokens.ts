import { setCookie } from "cookies-next/client";

import { UserCredentials } from "./getUserCredentials";

export default function saveUserTokens(credentials: UserCredentials) {
  setCookie("authTokens", JSON.stringify(credentials), {
    secure: true,
    sameSite: "strict",
  });
}
