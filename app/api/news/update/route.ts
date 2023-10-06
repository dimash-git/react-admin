import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const apiKey = retrieveApiKey(session.backendTokens);
    if (!apiKey) return;

    const body = await req.json();

    const { id, name, img_base_base64, img_ext, tags, desc, media_blocks } =
      body;

    const res = await axiosBack.post(
      "/admin/news/edit_single_news",
      {
        news_id: id,
        name,
        img_base_base64,
        img_ext,
        tags,
        desc,
        media_blocks,
      },
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    if (res.status != 200 || res.data.status.code != 200) {
      return new NextResponse("Update failed", { status: 500 });
    }

    // console.log(res.data.response);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("UPDATE_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
