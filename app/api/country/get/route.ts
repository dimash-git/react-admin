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

    const res = await axiosBack.post(
      "/country/get_countries",
      {
        skip: 0,
        limit: 99,
      },
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    return NextResponse.json({
      status: 200,
      content: res.data.content,
    });
  } catch (error: any) {
    const { response } = error;

    if (!response) {
      return new NextResponse("Internal error", { status: 500 });
    }

    const { status, statusText } = response;

    console.error("GET_ERROR", status, statusText);
    return new NextResponse(statusText, { status });
  }
}
