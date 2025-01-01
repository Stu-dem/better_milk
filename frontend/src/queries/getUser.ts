import axios from "axios";
import { getCookie } from "cookies-next/client";
import { useQuery } from "@tanstack/react-query";
import { getUserCredentials } from "@/lib/auth/getUserCredentials";

const getUserData = async () => {

  console.log("Getting user data...")
  const tokens = getUserCredentials()

  return await axios
    .get("http://localhost:8000/api/users/me/", {
      headers: {
        Authorization: `Bearer ${tokens?.access}`,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data.detail);
    });
};

function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserData,
    staleTime: 1000*5
  });
}

export default useUser;
