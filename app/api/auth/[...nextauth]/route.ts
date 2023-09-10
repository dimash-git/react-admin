import NextAuth, { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  axiosBack,
  getVerificationKey,
  retrieveApiKey,
} from "@/lib/serverUtils";
import { JWT } from "next-auth/jwt";

const ACCESS_TOKEN_EXPIRE_TIME = 10 * 60 * 1000;

// return type for next-auth provider "credentials"
interface User extends NextAuthUser {
  info: {
    user_id?: string;
  };
  expiresIn: number;
  backendTokens: BackendTokens;
}

async function refreshToken(token: JWT): Promise<JWT> {
  const apiKey = retrieveApiKey(token.backendTokens);
  const res = await axiosBack.get("/main/auth/refresh_auth", {
    headers: {
      Authorization: apiKey,
    },
  });

  console.log(res.data);

  return {
    ...token,
    backendTokens: res.data,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: {
          label: "Username",
          type: "text",
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

        console.log("VerKey: ", verification_key);

        if (!verification_key) return null;

        const res = await axiosBack.post(
          "/main/auth/login",
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
          const { user_id, ...content } = res.data.content;

          const user: User = {
            info: {
              user_id,
            },
            expiresIn: new Date().setTime(
              new Date().getTime() + ACCESS_TOKEN_EXPIRE_TIME
            ),
            backendTokens: content,
          };
          return user;
        }

        console.log("Error logging in with credentials: ", res.statusText);
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // console.log("jwt: ", { ...token, ...user });

      if (user) {
        return { ...token, ...user };
      } // this object will be passed as token in session callback

      return token;
    },
    async session({ token, session }) {
      session.user = token.info;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
