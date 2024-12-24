"use server"
import { cookies } from 'next/headers'

export const logout = async () => {
    let cookieStore = await cookies()
    cookieStore.delete("auth_access_token")
    cookieStore.delete("auth_refresh_token")
    return {success: "Logout successful!"}
}