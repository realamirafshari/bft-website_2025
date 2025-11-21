import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { userID, password } = credentials;
        await connectDB();

        if (!userID || !password) {
          throw new Error("Please enter both User ID and Password");
        }

        // پیدا کردن کاربر
        const user = await User.findOne({ userID });
        if (!user) throw new Error("User not found");

        // اگر کاربر پسورد نداشت (اما شما نمی‌خواهید بسازید)
        if (!user.password) {
          throw new Error("This account has no password set");
        }

        // چک کردن پسورد با bcrypt
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Incorrect password");
        }

        return {
          id: user._id.toString(),
          userID: user.userID,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userID = user.userID;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.userID = token.userID;
      session.user.role = token.role;
      return session;
    },
  },
};


const handler = NextAuth(authOptions);

export const GET = async (...args) => handler(...args);
export const POST = async (...args) => handler(...args);
