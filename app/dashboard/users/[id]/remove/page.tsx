import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { Button } from "@/components/ui/button";
import ModalPost from "@/components/modal-post";
import UserRemoveForm from "./_components/user-remove-form";

const UserRemovePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let remove: {
    is_remove: string | null;
    reason: string | null;
  };

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
      <div className="flex flex-col space-y-[10px]">
        <span className="font-medium text-[12px] leading-3 uppercase">
          Удален ли аккаунт
        </span>
        <span className="font-bold text-[20px] leading-4">
          {remove.is_remove ? "Да" : "Нет"}
        </span>
      </div>
      <div className="flex flex-col space-y-[10px]">
        <span className="font-medium text-[12px] leading-3 uppercase">
          Причина удаления
        </span>
        <span className="font-bold text-[20px] leading-4">
          {remove.reason ?? "-"}
        </span>
      </div>
      <div>
        <ModalPost
          Form={UserRemoveForm}
          title="Изменить решение об удалении"
          maxWidth="max-w-[355px]"
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
