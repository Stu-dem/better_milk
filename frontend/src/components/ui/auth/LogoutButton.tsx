"use client"

import { useRouter } from "next/navigation"

import { logout } from "@/actions/logout"

interface LogoutButtonProps {
    children: React.ReactNode
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {

    const router = useRouter();

    const handleClick = () => {
        logout();
        router.push("/")
    }

    return (
        <span onClick={handleClick} className="cursor-pointer">{children}</span>
    )
}