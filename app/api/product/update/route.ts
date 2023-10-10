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

    const { is_pack, products, ...restValues } = body;

    let data = {
      ...restValues,
      is_pack,
      pack_product_json: !is_pack
        ? undefined
        : JSON.stringify(
            products.map((product: { product_id: string; count: number }) => ({
              product_id: product.product_id,
              count: products.length,
            }))
          ),
    };
    console.log(data);

    const res = await axiosBack.post("/product/edit_product", data, {
      headers: {
        Authorization: apiKey,
      },
    });

    // console.log(res.data.response);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("UPDATE_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
