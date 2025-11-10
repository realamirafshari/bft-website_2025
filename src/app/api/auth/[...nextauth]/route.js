import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/utils/connectDB";
import User from "@/models/User";
import { verifyValue } from "@/utils/authentication";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;
        await connectDB();

        if (!email || !password) {
          throw new Error("Please enter valid information");
        }

        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");

        const isValid = await verifyValue(password, user.password);
        if (!isValid) throw new Error("Incorrect email or password.");

        return { email: user.email, role: user.role, fullName: user.fullName };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.fullName = user.fullName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.fullName = token.fullName;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
