import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      guestId?: number;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    email: string;
    name: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    guestId?: number;
  }
}