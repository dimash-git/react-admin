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

    // const entitySize = Buffer.byteLength(JSON.stringify(body)) / (1024 * 1024);
    // console.log(`${entitySize.toFixed(2)} mb`);

    const res = await axiosBack.post("/marketing/add_marketing", body, {
      headers: {
        Authorization: apiKey,
      },
    });

    // console.log(res.data);

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    const { response } = error;

    if (!response) {
      return new NextResponse("Internal error", { status: 500 });
    }

    const { status, statusText } = response;

    console.error("CREATE_ERROR", status, statusText);
    return new NextResponse(statusText, { status });
  }
}
