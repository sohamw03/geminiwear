import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../../models/User";
import connectDb from "@/middleware/mongoose";

export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET as string,
  // Providers array will be configured in the next steps
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        await connectDb();
        console.log("credentials", credentials);
        const user = await User.findOne({ email: credentials?.email }).select("+password").exec();
        if (!user) {
          throw new Error("Invalid email or password");
        }
        if (user.validPassword(credentials?.password as string)) {
          return Promise.resolve(user.toObject());
        } else {
          throw new Error("Invalid email or password");
        }
      },
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
  pages: {
    signIn: "/login", // The signIn page
    signOut: "/", // The signOut page
    error: "/signup", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/", // If set, new users will be directed here on first sign in
  },
  callbacks: {
    signIn: async ({ account, profile }) => {
      await connectDb();

      const myprofile = profile as any;

      if (account?.provider === "google" && myprofile.email_verified && myprofile.email.endsWith("@gmail.com")) {
        console.log({ account, profile });

        try {
          const user = await User.findOne({ email: myprofile.email });
          console.log({ user });
          if (user) {
            return Promise.resolve("/");
          } else {
            return Promise.resolve(`/signup?email=${encodeURIComponent(myprofile.email)}`);
          }
        } catch (error) {
          console.error(error);
        }
      } else if (account?.provider === "credentials") {
        return true;
      }

      return false;
    },
    jwt: async ({ token, user, account, profile, trigger }) => {
      console.log("jwt callback", { token, user, account, profile, trigger });
      if (user) {
        connectDb();
        const existingUser = await User.findOne({ email: user.email });
        // Add custom claims to the JWT. These will be saved in the JWT.
        token.userData = {
          name: existingUser?.name,
          email: existingUser?.email,
          address: existingUser?.address,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      console.log("session callback", { session, token });
      // Add property to session, like an access control list
      session.user = token.userData as any;
      return session;
    },
  },
  session: {
    maxAge: 24 * 60 * 60, // 1 day
  },
  // Additional configuration will be added here
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
