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

    const { id, decision } = body;

    const res = await axiosBack.post(
      "/p2p_complain/save_decision",
      {
        complain_id: id,
        decision,
      },
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    if (res.status != 200 || res.data.status.code != 200) {
      return new NextResponse("Save failed", { status: 500 });
    }

    // console.log(res.data.response);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("SAVE_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
