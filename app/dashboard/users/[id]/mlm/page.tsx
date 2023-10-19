import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import InfoBlock from "@/components/info-block";
import { unixToReadableDate } from "@/lib/utils";
import ModalPost from "@/components/modal-post";
import UserClauseForm from "./_components/user-clause-form";
import { redirect } from "next/navigation";

const UserMlmPage = async ({ params }: { params: { id: string } }) => {
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
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <>
      <InfoBlock
        title="Персональные продажи"
        content={String(mlm_info?.personal_sales)}
      />
      <InfoBlock
        title="Командные продажи"
        content={String(mlm_info?.team_sales)}
      />
      <InfoBlock
        title="Персональные регистрации"
        content={String(mlm_info?.personal_registry)}
      />
      <InfoBlock
        title="Командные регистрации"
        content={String(mlm_info?.team_registry)}
      />
      <InfoBlock
        title="Уровень квалификации"
        content={String(mlm_info?.qualification_level)}
      />
      <InfoBlock
        title="Дата завершения карьеры"
        content={
          mlm_info?.career_closing_date
            ? unixToReadableDate(mlm_info.career_closing_date)
            : "-"
        }
      />

      <div className="flex flex-col space-y-[30px]">
        <div className="text-[23px] font-bold">Быстрый старт</div>
        <div className="flex gap-x-[30px]">
          <InfoBlock
            title="Дата начала “Быстрого старта”"
            content={
              mlm_info?.quick_start?.create_date
                ? String(unixToReadableDate(mlm_info.quick_start.create_date))
                : "-"
            }
          />
          <InfoBlock
            title="Дата окончания “Быстрого старта”"
            content={
              mlm_info?.quick_start?.expired_date
                ? String(unixToReadableDate(mlm_info.quick_start.expired_date))
                : "-"
            }
          />
          <InfoBlock
            title="Процент"
            content={(mlm_info?.quick_start?.percent ?? "0") + " %"}
          />
        </div>
      </div>

      <div>
        <Button
          asChild
          type="button"
          variant="formSubmit"
          size="md"
          className="text-[16px] h-10"
        >
          <Link href="mlm/edit">Изменить</Link>
        </Button>
      </div>

      {/* Separator */}
      <div></div>

      <div className="flex flex-col space-y-[30px]">
        <div className="text-[23px] font-bold">Клауза</div>
        <div className="flex gap-x-[30px]">
          <InfoBlock
            title="На клаузе"
            content={mlm_info?.clause?.is_on_clause ? "Да" : "-"}
          />
          <InfoBlock
            title="Клауза включена"
            content={mlm_info?.clause?.is_clause_enable ? "Да" : "Нет"}
          />
          <InfoBlock
            title="Клауза"
            content={String(mlm_info?.clause?.clause) ?? "0"}
          />
        </div>
      </div>

      <div>
        <ModalPost
          Form={UserClauseForm}
          card={mlm_info?.clause?.is_clause_enable}
          title="Изменить параметры клаузы"
        >
          <Button
            asChild
            variant="formSubmit"
            size="md"
            className="text-[16px] h-10"
          >
            <span>Вкл/откл</span>
          </Button>
        </ModalPost>
      </div>
    </>
  );
};

export default UserMlmPage;
