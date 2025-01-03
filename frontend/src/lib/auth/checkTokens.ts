
import { UserCredentials } from "@/types/user";


export const checkTokens = async (userCredentials: UserCredentials) => {

    let output = {
      loggedIn: false,
      refreshExpired: false,
      updateTokens: false,
    };
  
    // No refresh token - user is not logged in, return false
    if (!userCredentials?.refresh) {
      output.loggedIn = false;
      return output;
    }
  
    // No access token - user is not logged in, return false
    if (!userCredentials?.access) {
      output.loggedIn = false;
      return output;
    }
  
    // Tokens exist, then check if they are expired
    const accessTokenExpires = new Date(userCredentials.accessTokenExpires);
    const refreshTokenExpires = new Date(userCredentials.refreshTokenExpires);
  
    // Refresh token is expired, user is not logged in
    if (refreshTokenExpires.getTime() < new Date().getTime()) {
      output.refreshExpired = true;
      return output;
    }
  
    // Access token is expired, return true to update tokens
    if (accessTokenExpires.getTime() < new Date().getTime()) {
      output.loggedIn = true;
      output.updateTokens = true;
      return output;
    }
  
    // All tokens present and valid
    output.loggedIn = true;
    return output;
  
  }