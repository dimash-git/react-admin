import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const apiKey = retrieveApiKey(session.backendTokens);
    if (!apiKey) return;

    const body = await req.json();
    const { id } = body;

    const res = await axiosBack.post(
      "/support/delete_article",
      {
        question_id: id,
      },
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    // console.log(res.data.response);

    if (res.status != 200 || res.data.status.code != 200) {
      return new NextResponse("Delete failed", { status: 500 });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("DELETE_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
