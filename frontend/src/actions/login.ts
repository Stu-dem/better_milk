"use server"

import * as z from "zod"
import axios from "axios"
import { LoginSchema } from "@/schemas"

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const login = async (values: z.infer<typeof LoginSchema>) => {

    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return {error: "Invalid fields"}
    }

    try {
        await axios({
            url: "http://localhost:8000/api/auth/login/",
            method: "post",
            data: {
                ...validatedFields.data
            },
          });    
      } catch (error) {
        if (error.response.status === 400) {
          return { error: error.response.data.non_field_errors[0] };
        }
        console.error('Error loggin in:', error.response.data);
        return { error: 'Error checking logging in' };
      }

    await sleep(500)

    return {success: "Login successful!"}
}