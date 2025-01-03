
import { getCookie } from "cookies-next/client";

export const getTokens = async () => {

  try {
    const tokens = await getCookie("authTokens");
    const userCredentials = JSON.parse(tokens as string);

    if (!userCredentials) {
      return null;
    }

    return userCredentials;
    
  } catch (error) {
    console.error("Error getting tokens: ", error);
    return null;
  }
}