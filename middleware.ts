import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/sign-in",
    error: "/api/auth/error",
  },
});

export const config = { matcher: ["/dashboard/:path*"] };
