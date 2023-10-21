import NextAuth, { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  axiosBack,
  getVerificationKey,
  retrieveApiKey,
} from "@/lib/server-utils";
import { JWT } from "next-auth/jwt";

const ACCESS_TOKEN_EXPIRE_TIME = 9 * 60 * 1000;

// return type for next-auth provider "credentials"
interface User extends NextAuthUser {
  backendTokens: BackendTokensWE;
}

async function refreshToken(token: JWT): Promise<JWT> {
  const apiKey = retrieveApiKey(token.backendTokens);
  console.log(`apiKey in refresh: ${apiKey}`);

  const res = await axiosBack.get("/main/auth/refresh_auth", {
    headers: {
      Authorization: apiKey,
    },
  });

  console.log("refresh attempt: ", res.data);

  const { status, content } = res.data;

  if (status.code != 200) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }

  const { access_token, refresh_token } = content;

  return {
    ...token,
    backendTokens: {
      access_token,
      refresh_token,
      expiresIn: new Date().setTime(
        new Date().getTime() + ACCESS_TOKEN_EXPIRE_TIME
      ),
    },
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        type: {
          label: "Type",
          type: "text",
        },
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
        console.log(credentials);

        if (
          !credentials?.login ||
          !credentials?.password ||
          !credentials?.type ||
          !credentials?.code
        )
          return null;

        const { login, password, code, type } = credentials;

        const verification_key = await getVerificationKey({
          login,
          type: type as "google" | "phone",
          code,
        });

        console.log("Verification Key: ", verification_key);

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
            id: user_id, // DefaultUser Type
            backendTokens: {
              ...content,
              expiresIn: new Date().setTime(
                new Date().getTime() + ACCESS_TOKEN_EXPIRE_TIME
              ),
            },
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
      // console.log("token jwt: ", token);
      // console.log("user jwt: ", user);

      // Initial sign in
      if (user) return { ...token, ...user };

      // Return previous token if the access token has not expired yet
      if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      return await refreshToken(token);
    },
    async session({ token, session }) {
      session.user = { id: token.id };
      session.backendTokens = token.backendTokens;
      session.error = token.error;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
