import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { getVerificationKey } from "@/lib/serverUtils";
import { BACKEND_URL } from "@/lib/constants/variables";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: {
          label: "Username",
          type: "text",
          placeholder: "adam",
        },
        password: {
          label: "Password",
          type: "password",
        },
        code: { label: "Two-Factor Code", type: "number" },
      },
      async authorize(credentials, req) {
        if (!credentials?.login || !credentials?.password || !credentials?.code)
          return null;

        const { login, password, code } = credentials;

        const verification_key = await getVerificationKey({
          login,
          type: "google",
          code,
        });

        if (!verification_key) return null;

        const res = await axios.post(
          BACKEND_URL + "/main/auth/login",
          {
            login,
            password,
            verification_key,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status == 200) {
          const user = res.data;
          return user;
        }

        console.log(res.statusText);
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
