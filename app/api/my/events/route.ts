import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const apiKey = retrieveApiKey(session.backendTokens);

    const res = await axiosBack.post(
      "/main/event/get_events",
      {
        skip: 0,
        limit: 19,
      },
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    if (res.status != 200 || res.data.status.code != 200) {
      return new NextResponse("Get events failed", { status: 500 });
    }

    console.log(res.data);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
