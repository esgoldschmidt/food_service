/ types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      handle?: string;
      name?: string | null;
      nickname?: string | null;
      email?: string | null;
      emailVerified?: Date | null;
      mobilePhone?: string | null;
      mobilePhoneVerified?: boolean;
      image?: string | null;
      bio?: string | null;
      timeLastMessageRead?: Date | null;
      isAdmin?: boolean;
      isActive?: boolean;
      status?: string;
    };
  }

  interface User {
    id: string;
    handle?: string;
    name?: string | null;
    nickname?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    mobilePhone?: string | null;
    mobilePhoneVerified?: boolean;
    image?: string | null;
    bio?: string | null;
    timeLastMessageRead?: Date | null;
    isAdmin?: boolean;
    isActive?: boolean;
    status?: string;
  }
}