import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const apiKey = retrieveApiKey(session.backendTokens);
    if (!apiKey) return;

    const body = await req.json();

    const res = await axiosBack.post("/event/edit_event", body, {
      headers: {
        Authorization: apiKey,
      },
    });

    // console.log(res.data.response);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("UPDATE_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
