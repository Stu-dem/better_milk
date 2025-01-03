import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, {message: 'Password is required'}),
})

export const RegisterSchema = z.object({
    email: z.string().email(),
    password_1: z.string().min(6, {message: 'Password must be at least 6 characters'}),
    password_2: z.string(),
    first_name: z.string().min(1, {message: 'First name is required'}),
    last_name: z.string().min(1, {message: 'Last name is required'}),
}).refine(data => data.password_1 === data.password_2, {
    message: "Passwords must match",
    path: ["password_2"], // Specify the path to show the error message
  });