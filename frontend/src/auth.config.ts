import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import axios from "axios"

import { LoginSchema } from "@/schemas"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [Credentials({
    async authorize(credentials) {
      const validatedFields = LoginSchema.safeParse(credentials);

      if (validatedFields.success) {
        const { email, password } = validatedFields.data;

        try {
          const loginResponse = await axios({
              url: "http://localhost:8000/api/auth/login/",
              method: "post",
              data: {
                  email, password
              },
            });    

          if (loginResponse.status === 200) {
            const userData = {
              user: {...loginResponse.data.user},
              access: loginResponse.data.access,
              refresh: loginResponse.data.refresh
            }
            return userData;
          }
        } catch (error) {
          console.log(error)
        }

        return null;
        
      }
    }
  })],
} satisfies NextAuthConfig