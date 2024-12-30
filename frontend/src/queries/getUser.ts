import axios from "axios";
import { getCookie } from "cookies-next/client";
import { useQuery } from "@tanstack/react-query";

const getUserData = async () => {
  const accessToken = getCookie("auth_access_token");
  console.log("Access Token", accessToken);

  return await axios
    .get("http://localhost:8000/api/users/me/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
  });
}

export default useUser;
