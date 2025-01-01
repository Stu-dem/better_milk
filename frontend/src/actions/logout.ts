"use server"
import { cookies } from 'next/headers'

export const logout = async () => {
    let cookieStore = await cookies()
    cookieStore.delete("authTokens")
    return {success: "Logout successful!"}
}