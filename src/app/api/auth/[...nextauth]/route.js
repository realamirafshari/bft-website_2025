import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/utils/connectDB";
import User from "@/models/User";
import { verifyPassword } from "@/utils/authentication";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        await connectDB();

        if (!email || !password) {
          throw new Error("لطفا اطلاعات معتبر را وارد نمائید");
        }

        const user = await User.findOne({ email });
        if (!user) throw new Error("کاربری یاقت نشد");





        const isValid = await verifyPassword(
          password,
          user.password
        );
        if (!isValid) throw new Error("ایمیل یا رمزعبور اشتباه است.");

        return { id: user._id.toString(), email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
