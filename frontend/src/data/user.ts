import axios from "axios";
import { cookies } from "next/headers";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  // console.log({session})

  try {
    const existingUserResponse = await axios.get(
      "http://localhost:8000/api/users/me/",
      { headers: { Authorization: "Bearer " + cookieStore?.auth_access_token } }
    );

    // console.log("Existing user response: ", existingUserResponse.data);

    return existingUserResponse.data;
  } catch (error) {
    console.error("Error fetching existing user:", error);
    return error.data;
  }
};

export const checkUserExists = async (email: string) => {
  try {
    const existingUserResponse = await axios.post(
      "http://localhost:8000/api/authutils/existingUser/",
      {
        email: email,
      }
    );

    if (existingUserResponse.data.user_exists) {
      return { error: "User already exists" };
    }

    return { success: "User does not exist" };
  } catch (error) {
    if (error.response.status != 404) {
      console.error("Error checking existing user:", error);
    }

    return { error: "Error checking email" };
  }
};
