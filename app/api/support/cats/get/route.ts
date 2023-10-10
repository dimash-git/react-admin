import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log("session", session);

    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const apiKey = retrieveApiKey(session.backendTokens);
    if (!apiKey) return;

    const res = await axiosBack.post(
      "/support/get_categories",
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

    // console.log(res.data.response);

    return NextResponse.json({ status: 200, content: res?.data?.content });
  } catch (error) {
    console.log("GET_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
