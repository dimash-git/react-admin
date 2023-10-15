import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { axiosBack, retrieveApiKey } from "@/lib/server-utils";

import UserPersonalForm from "../_components/user-personal-form";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let personal_info: UserPersonal;

  try {
    const res = await axiosBack.post(
      "/user/personal_info/get_personal_info",
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
      throw new Error("Error loading Personal Info for user");
    }

    personal_info = content.personal_info;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }
  return (
    <div className="flex flex-col space-y-[30px]">
      <UserPersonalForm parsed={personal_info} />
    </div>
  );
};

export default EditPage;
