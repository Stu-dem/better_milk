"use server"

import * as z from "zod"
import { AuthError } from "next-auth"

import { LoginSchema } from "@/schemas"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const login = async (values: z.infer<typeof LoginSchema>) => {

    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return {error: "Invalid fields"}
    }

    const { email, password } = validatedFields.data

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
      } catch (error) {

        console.log(error)

        if (error instanceof AuthError) {
          switch (error.type) {
            case "CredentialsSignin":
              return { error: "Invalid credentials" }; 
            default:
              return { error: "Something went wrong..." };
          }
        }

        throw error;

      }

    await sleep(500)

    return {success: "Login successful!"}
}