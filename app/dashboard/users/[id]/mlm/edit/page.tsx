import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { axiosBack, retrieveApiKey } from "@/lib/server-utils";

import UserMlmForm from "../_components/user-mlm-form";
import { redirect } from "next/navigation";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (session?.error == "RefreshAccessTokenError") {
    redirect("/sign-in");
  }
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let mlm_info: UserMlm;
  try {
    const res = await axiosBack.post(
      "/user/mlm_info/get_mlm_info",
      {
        user_id: id,
      },
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    // console.log(res.data);

    const { status, content } = res.data;

    if (status.code != 200) {
      throw new Error("Error loading Mlm Info for user");
    }

    mlm_info = content.mlm_info;
  } catch (error: any) {
    console.log(error);
    return <>{String(error)}</>;
  }

  return (
    <div className="flex flex-col space-y-[30px]">
      <UserMlmForm parsed={mlm_info} />
    </div>
  );
};

export default EditPage;
