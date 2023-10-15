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

    const res = await axiosBack.post("/user/mlm_info/edit_mlm_info", body, {
      headers: {
        Authorization: apiKey,
      },
    });
    console.log(body);

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    const { response } = error;

    if (!response) {
      return new NextResponse("Internal error", { status: 500 });
    }

    const { status, statusText } = response;
    console.log(response);

    console.log("UPDATE_ERROR", status, statusText);
    return new NextResponse(statusText, { status });
  }
}
