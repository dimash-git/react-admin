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

    const { id, user_id_p2p_ban, ...restValues } = body;

    const data = {
      appeal_id: id,
      user_id_p2p_ban:
        user_id_p2p_ban != "" ? user_id_p2p_ban.split(",") : null,
      ...restValues,
    };

    const res = await axiosBack.post("/p2p_appeal/close_appeal", data, {
      headers: {
        Authorization: apiKey,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("CLOSE_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
