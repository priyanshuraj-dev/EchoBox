import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export const authOptions: NextAuthOptions = {

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials:any) {
        await connectDB();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("User not found");
        if (!user.password) throw new Error("User has no password stored");
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) throw new Error("Invalid password");
        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },

    async session({ session, token }) {
      if(token){
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
      }
      return session;
    },
  },
  // the session is stored client-side inside a jwt token
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};