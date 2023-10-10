import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]/route";
import { axiosBack, retrieveApiKey } from "@/lib/server-utils";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const apiKey = retrieveApiKey(session.backendTokens);

    const res = await axiosBack.get("/main/auth/leave", {
      headers: {
        Authorization: apiKey,
      },
    });

    console.log("Logout info ", res.data);

    if (res.status != 200 || res.data.status.code != 200) {
      return new NextResponse("Logout failed", { status: 500 });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
