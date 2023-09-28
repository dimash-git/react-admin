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

    const {
      cat,
      img_base64,
      img_type,
      name,
      desc,
      price,
      discount,
      is_pack,
      is_robot,
      advantages,
      products,
    } = body;

    console.log(
      JSON.stringify(
        products.map((product: { product_id: string; count: number }) => ({
          product_id: product.product_id,
          count: products.length,
        }))
      )
    );

    let addData = {
      category_id: cat,
      img_base64,
      img_type,
      name,
      description: desc,
      price,
      discount,
      is_pack,
      is_robot,
      advantages: advantages.map((adv: { text: string }) => adv.text),
      pack_product_json: !is_pack
        ? undefined
        : JSON.stringify(
            products.map((product: { product_id: string; count: number }) => ({
              product_id: product.product_id,
              count: products.length,
            }))
          ),
    };
    console.log(addData);

    const res = await axiosBack.post("/product/add_product", addData, {
      headers: {
        Authorization: apiKey,
      },
    });

    // console.log(res.data.response);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("PRODUCT_PUBLISH_ERROR", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
