"use server"

import * as z from "zod"
import { AuthError } from "next-auth"

import { LoginSchema } from "@/schemas"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

import axios from "axios"

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

        if (axios.isAxiosError(error)) {
          if (error.response) {
            // Handle specific status codes
            if (error.response.status === 400) {
              return { error: error.response.data.non_field_errors?.[0] || 'Invalid request' };
            } else if (error.response.status === 401) {
              return { error: 'Invalid credentials' };
            } else if (error.response.status === 500) {
              return { error: 'Internal server error' };
            }
          } else if (error.request) {
            // The request was made but no response was received
            return { error: 'No response from server' };
          } else {
            // Something happened in setting up the request that triggered an Error
            return { error: 'Error setting up request - check your connection' };
          }
        } else if (error instanceof AuthError) {
          switch (error.type) {
            case 'CredentialsSignin':
              return { error: 'Invalid credentials' };
            default:
              return { error: 'Something went wrong...' };
          }
        } else {
          // Handle non-Axios errors
          return { error: 'An unexpected error occurred' };
        }
        throw error;

      }
    return {success: "Login successful!"}
}