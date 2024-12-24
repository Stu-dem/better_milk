"use client"

import UserInfo from "@/components/UserInfo";

const ClientPage = () => {

    const user = {
        name: "Client User",
        email: ""
    }

    return (
        <div>
            <UserInfo user={user} label= "🧑‍💻Client component" />
        </div>
    );
}

export default ClientPage;