import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { redirect } from "next/navigation";

import UserMainForm from "../_components/user-main-form";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (session?.error == "RefreshAccessTokenError") {
    redirect("/sign-in");
  }
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let main_info: UserMain;
  try {
    const res = await axiosBack.post(
      "/user/main_info/get_main_info",
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
      throw new Error("Error loading Main Info for user");
    }

    main_info = content.main_info;
  } catch (error: any) {
    console.log(error);
    return <>{String(error)}</>;
  }
  return (
    <div className="flex flex-col space-y-[30px]">
      <UserMainForm parsed={main_info} />
    </div>
  );
};

export default EditPage;
