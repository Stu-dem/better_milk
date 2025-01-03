"use server"

import UserInfo from "@/components/UserInfo";
import { getCurrentUser } from "@/data/user";

const ServerPage = async () => {

    const user = await getCurrentUser();

    return (
        <div>
            {user ? <UserInfo user={user} label= "💻Server component" /> : ""}
        </div>
    );
}

export default ServerPage;