import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
    };
    backendTokens: BackendTokens;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    backendTokens: BackendTokensWE;
  }
}
