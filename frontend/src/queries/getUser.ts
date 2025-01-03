import { useQuery } from "@tanstack/react-query";
import fetchWithCredentials from "@/lib/auth/fetchWithCredentials";

const getUserData = async () => {
  return await fetchWithCredentials("users/me/", {
    method: "GET",
  })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error(error.response.data.detail);
    });
};

function useUser(enabled = true) {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserData,
    staleTime: 1000 * 60,
    enabled,
  });
}

export default useUser;
