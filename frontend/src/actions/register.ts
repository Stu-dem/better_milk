"use server";

import * as z from "zod";
import axios from "axios";
// import bcrypt from "bcrypt";

import { RegisterSchema } from "@/schemas";
import { checkUserExists } from "@/data/user";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password_1, password_2, first_name, last_name } = validatedFields.data;
  // const hashedPassword_1 = await bcrypt.hash(password_1, 10);

  const existingUserResponse = await checkUserExists(email);

  if (existingUserResponse.error) {
    return { error: existingUserResponse.error };
  }

  try {
    const response = await axios.post(
      "http://localhost:8000/api/registration/",
      {
        email: email,
        password1: password_1,
        password2: password_1,
        first_name: first_name,
        last_name: last_name,
      }
    );

  } catch (error) {
    console.error("Error registering user:", error);
    return { error: "Error registering user" };
  }

  await sleep(500);

  return { success: "Register successful!" };
};
