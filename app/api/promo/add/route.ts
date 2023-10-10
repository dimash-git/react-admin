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
      name,
      img_data_base64,
      img_data_type,
      file_data_base64,
      file_data_type,
    } = body;

    const res = await axiosBack.post(
      "/promo/add_promo_material",
      {
        name,
        img_data_base64,
        img_data_type,
        file_data_base64,
        file_data_type,
      },
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    if (res.status != 200 || res.data.status.code != 200) {
      return new NextResponse("Promo publish failed", { status: 500 });
    }

    console.log(res.data.response);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("PROMO_PUBLISH_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
