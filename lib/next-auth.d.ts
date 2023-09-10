import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      user_id?: string;
    };
    backendTokens: {
      access_token: string;
      refresh_token: string;
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    info: {
      user_id?: string;
    };
    backendTokens: {
      access_token: string;
      refresh_token: string;
      expiresIn: number;
    };
  }
}
