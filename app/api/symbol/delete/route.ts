import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const apiKey = retrieveApiKey(session.backendTokens);
    if (!apiKey) return;

    const body = await req.json();
    const { id } = body;
    const res = await axiosBack.post(
      "/tradingview/delete_symbol",
      {
        symbol_id: id,
      },
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    if (res.status != 200 || res.data.status.code != 200) {
      return new NextResponse("Tag delete failed", { status: 500 });
    }

    // console.log(res.data);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("TAG_DELETE_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
