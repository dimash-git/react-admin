import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const UserPersonalPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let personal: any;

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

    console.log(res.data);

    const { status, content } = res.data;

    if (status.code != 200) {
      throw new Error("Error loading Personal Info for user");
    }

    personal = content.personal;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <>
      <div>
        <Button
          asChild
          type="button"
          variant="formSubmit"
          size="md"
          className="text-[16px] h-10"
        >
          <Link href="personal/edit">Изменить</Link>
        </Button>
      </div>
    </>
  );
};

export default UserPersonalPage;
