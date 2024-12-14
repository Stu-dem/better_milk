"use client"

import { logout } from "@/actions/logout";
import {useSession } from "next-auth/react";

const SettingsPage = () => {

    const session = useSession();

    const handleClick = () => {
        logout();
    }

    return (
        <div>
            <h1>Settings</h1>
            <div className="">
                {JSON.stringify(session)}
                    <button onClick={handleClick}>Sign Out</button>
            </div>
        </div>
    );
}

export default SettingsPage;