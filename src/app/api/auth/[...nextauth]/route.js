import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { userID } = credentials;
        await connectDB();

        if (!userID) {
          throw new Error("Please enter a valid User ID");
        }

        const user = await User.findOne({ userID });
        if (!user) throw new Error("User not found");

        // این مقادیر داخل token ذخیره می‌شود
        return {
          id: user._id.toString(), // برای مرجع دیتابیس
          userID: user.userID, // مقدار userID واقعی
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
      if (token) {
        session.user.id = token.id;
        session.user.userID = token.userID;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
