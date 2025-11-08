import CredentialsProvider from "next-auth/providers/credentials";
export const authOption = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;
      },
    }),
  ],
};
