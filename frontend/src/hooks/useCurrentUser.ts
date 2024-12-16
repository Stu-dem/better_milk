import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
    const session = useSession();
    // console.log("CLIENT USER: ", {user: session.data?.user});
    return session.data?.user;
}