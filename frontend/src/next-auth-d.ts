import { DefaultSession } from "next-auth";


export type ExtendedUser = DefaultSession["user"] & {
    first_name: string;
    last_name: string;
    is_active: boolean;
    is_admin: boolean;
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}