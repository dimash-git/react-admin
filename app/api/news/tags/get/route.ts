import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const apiKey = retrieveApiKey(session.backendTokens);
    if (!apiKey) return;

    const res = await axiosBack.post(
      "/news/get_tags",
      {
        skip: 0,
        limit: 25,
      },
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    if (res.status != 200 || res.data.status.code != 200) {
      return new NextResponse("Get tags failed", { status: 500 });
    }

    // console.log(res.data);

    return NextResponse.json({ status: 200, content: res?.data?.content });
  } catch (error) {
    console.log("TAGS_GET_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
