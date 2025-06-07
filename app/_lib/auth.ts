import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const existingGuest = await getGuest(user.email!);

        if (!existingGuest) {
          await createGuest({ email: user.email!, fullName: user.name! });
        }
        return true;
      } catch {
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user?.email) {
        const guest = await getGuest(user.email);
        token.guestId = guest?.id;
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          guestId: token.guestId,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
