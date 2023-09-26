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

    const { cat, question, answer } = body;

    const res = await axiosBack.post(
      "/support/add_question",
      {
        category_id: cat,
        question,
        answer,
      },
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    if (res.status != 200 || res.data.status.code != 200) {
      return new NextResponse("Publish failed", { status: 500 });
    }

    // console.log(res.data);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("PUBLISH_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
