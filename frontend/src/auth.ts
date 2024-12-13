import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { JWT } from "@auth/core/jwt";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  callbacks: {
    async session({ token, session }) {
      session.user = token;

      return session;
    },

    async jwt({ token, user }) {
      if (!token.sub) return token;

      const existingUser = user;

      if (!existingUser) return token;

      token.email = existingUser.email;
      token.first_name = existingUser.first_name;
      token.last_name = existingUser.last_name;
      token.is_active = existingUser.is_active;
      token.is_admin = false;

      // console.log({token})
      return token;
    },
  },
  session: { strategy: "jwt" },
});

declare module "@auth/core/jwt" {
  interface JWT {
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    is_admin: boolean;
  }
}
