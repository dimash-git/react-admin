import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { Button } from "@/components/ui/button";
import ModalPost from "@/components/modal-post";
import UserRemoveForm from "./_components/user-remove-form";
import InfoBlock from "@/components/info-block";
import { redirect } from "next/navigation";

const UserRemovePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (session?.error == "RefreshAccessTokenError") {
    redirect("/sign-in");
  }
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let remove: UserRemoved;

  try {
    const res = await axiosBack.post(
      "/user/remove/is_remove",
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
      throw new Error("Error loading Main Info for user");
    }

    remove = content.remove;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <>
      <InfoBlock
        title="Удален ли аккаунт"
        content={remove?.is_remove ? "Да" : "Нет"}
      />
      <InfoBlock title="Причина удаления" content={remove?.reason ?? "-"} />
      <div>
        <ModalPost
          Form={UserRemoveForm}
          title="Изменить решение об удалении"
          maxWidth="max-w-[355px]"
          card={remove}
        >
          <Button
            asChild
            variant="formSubmit"
            size="md"
            className="text-[16px] h-10"
          >
            <span>Изменить</span>
          </Button>
        </ModalPost>
      </div>
    </>
  );
};

export default UserRemovePage;
