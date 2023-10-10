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

    const {
      event_id,
      name,
      desc,
      timestamp,
      is_online,
      img_type,
      img_data_base64,
      media_blocks,
    } = body;

    const res = await axiosBack.post(
      "/event/edit_event",
      {
        event_id,
        name,
        desc,
        is_online,
        timestamp,
        img_type,
        img_data_base64,
        media_blocks,
      },
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    // console.log(res.data.response);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("UPDATE_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
