"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { UserButton } from "@/components/ui/auth/UserButton";

export const Navbar = () => {

    const pathname = usePathname();

  return (
    <div className="bg-secondary flex justify-between p-4 rounded-xl w-[600px]">
      <div className="flex gap-x-2">
      <Button asChild variant={pathname === "/server" ? "default" : "outline"}>
            <Link href="/server">server</Link>
        </Button>
        <Button asChild variant={pathname === "/settings" ? "default" : "outline"}>
            <Link href="/settings">Settings</Link>
        </Button>
        <Button asChild variant={pathname === "/client" ? "default" : "outline"}>
            <Link href="/client">Client</Link>
        </Button>
        <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
            <Link href="/admin">Admin</Link>
        </Button>
      </div>
      <UserButton />
    </div>
  );
};
