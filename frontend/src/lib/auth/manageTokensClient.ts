
import { getCookie } from "cookies-next/client";

export const getTokens = async () => {

  try {
    const tokens = await getCookie("authTokens");

    console.log({tokens})

    if (!tokens) {
      return null;
    }


    const userCredentials = JSON.parse(tokens as string);
    return userCredentials;
  } catch (error) {
    console.error("Error getting tokens: ", error);
    return null;
  }
}