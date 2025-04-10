import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from "next-auth/providers/facebook"
import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/prisma";
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    debug: false, // process.env.NODE_ENV === "development"
    adapter:PrismaAdapter(prisma),
    theme: {
      colorScheme: "auto", // "auto" | "dark" | "light"
      brandColor: "#eebf01", // Hex color code
      logo: "https://goldylocks.io/resources/logo/goldylocks_logo.png", // Absolute URL to image
      buttonText: "#27282a" // Hex color code
    },
    providers: [
    //   FacebookProvider({
    //       clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
    //       clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",

    //   }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      }),
    //     GitHubProvider({
    //       clientId: process.env.GITHUB_ID ?? "",
    //       clientSecret: process.env.GITHUB_SECRET ?? "",
    //   }),
        EmailProvider({
            server: {
              host: process.env.EMAIL_SERVER_HOST, 
              port: 587,
              auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD
              }
            },
            from: process.env.EMAIL_FROM as string
          }),   
    ],
    session: {
        strategy: 'database',
        maxAge: 30 * 24 * 60 * 60
    },
    callbacks: {
      async session({ session, token, user }) {
        if (user) {
          
        
          // Attach the Pro information to the session object
          session.user = {
            ...session.user,
            id: user.id, // Ensure the user ID is included
            handle: user.handle,
            name: user.name,
            nickname: user.nickname,
            email: user.email,
            emailVerified: user.emailVerified || undefined,
            mobilePhone: user.mobilePhone,
            mobilePhoneVerified: user.mobilePhoneVerified,
            image: user.image,
            bio: user.bio,
            timeLastMessageRead: user.timeLastMessageRead,
            isAdmin: user.isAdmin,
            isActive: user.isActive,
            status: user.status,
          };
        }

        return session;
      },
      
    }
}