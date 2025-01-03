"use server"
import { cookies } from 'next/headers'
import { setFlash } from '@/lib/flash-toaster'

export const logout = async () => {
    let cookieStore = await cookies()
    cookieStore.delete("authTokens")
    setFlash({type: "success", message: "Logout successful!"})
    return {success: "Logout successful!"}
}