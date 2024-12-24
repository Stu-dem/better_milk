"use server"

import * as z from "zod"
import NextAuth, { AuthError } from "next-auth"
import { cookies } from 'next/headers'
import axios from "axios"

import { LoginSchema } from "@/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { NextResponse } from "next/server"

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const login = async (values: z.infer<typeof LoginSchema>) => {

    const validatedFields = LoginSchema.safeParse(values)
    const cookieStore = await cookies()
    if (!validatedFields.success) {
        return {error: "Invalid fields"}
    }

    const { email, password } = validatedFields.data

    try {
        const response = await axios.post("http://localhost:8000/api/auth/login/", {
          email,
          password
        })

        if (response.status === 200) {
          cookieStore.set("auth_access_token", response.data.access, {secure: true}) 
          cookieStore.set("auth_refresh_token", response.data.refresh, {secure: true})
        }

      } catch (error) {

        console.log("ERROR!")
        console.log(error)
        // TODO: check handling of redirect error.
        if (error?.response?.status === 401) {
          switch (error?.r1esponse?.status) {
            case 401:
              return { error: "Invalid credentials" }; 
            default:
              return { error: "Something went wrong..." };
          }
        }

        throw error;

      }

    

    return {success: "Login successful!"}
}