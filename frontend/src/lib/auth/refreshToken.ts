import { UserCredentials } from "@/types/user";

export const refreshTokens = async (userCredentials: UserCredentials) => {

  try {
    const response = await fetch(
      "http://localhost:8000/api/auth/token/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: userCredentials.refresh }),
      }
    );

    return response.json().then((data) => {
      console.log("Successfully refreshed tokens");
      return data
    })
  } catch (error) {
    console.error("Error refreshing access token: ", error);
    return null;
  }
}
