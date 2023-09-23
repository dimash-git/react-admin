import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";
import { authOptions } from "../../../auth/[...nextauth]/route";

interface PutData {
  name: string;
  category_id: string;
  data_type?: string;
  data_base64?: string;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const apiKey = retrieveApiKey(session.backendTokens);
    if (!apiKey) return;

    const body = await req.json();

    const { name, category_id, data_type, data_base64 } = body;

    let putData: PutData = {
      name,
      category_id,
    };

    if (data_type != "") {
      putData.data_type = data_type;
      putData.data_base64 = data_base64;
    }

    const res = await axiosBack.post("/support/edit_category", putData, {
      headers: {
        Authorization: apiKey,
      },
    });

    if (res.status != 200 || res.data.status.code != 200) {
      return new NextResponse("Categories update failed", { status: 500 });
    }

    console.log(res.data.response);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("CATS_UPDATE_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
