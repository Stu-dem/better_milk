"use client"

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const SettingsPage = () => {

    const user = useCurrentUser();

    const handleClick = () => {
        logout();
    }

    return (
        <div>
            <h1>Settings</h1>
            <div className="">
                {JSON.stringify(user)}
                    <button onClick={handleClick}>Sign Out</button>
            </div>
        </div>
    );
}

export default SettingsPage;