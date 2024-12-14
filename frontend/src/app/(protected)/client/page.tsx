"use client"

import { useCurrentUser } from "@/hooks/useCurrentUser";
import UserInfo from "@/components/UserInfo";

const ClientPage = () => {

    const user = useCurrentUser();

    return (
        <div>
            <UserInfo user={user} label= "🧑‍💻Client component" />
        </div>
    );
}

export default ClientPage;