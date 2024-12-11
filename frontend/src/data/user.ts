import axios from "axios";

export const getCurrentUser = async () => {
    try {
        const existingUserResponse = await axios.get(
          "http://localhost:8000/api/auth/me/",
        );
    
        return existingUserResponse.data;

      } catch (error) {
        console.error("Error fetching existing user:", error);
        return error.data;
      }
}

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
    

}
