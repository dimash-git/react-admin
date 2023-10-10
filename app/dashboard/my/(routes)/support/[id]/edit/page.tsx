import Breadcrumbs from "@/components/breadcrumbs";

import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import QuestionForm from "../../_components/qa-form";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  const res = await axiosBack.post(
    "/support/get_question",
    {
      question_id: id,
    },
    {
      headers: {
        Authorization: apiKey,
      },
    }
  );

  const { status, content } = res.data;
  console.log(content);

  if (status.code != 200) return <div>Ошибка загрузки поста</div>;

  const { question } = content;
  console.log("question", question);

  return (
    <>
      <Breadcrumbs
        customLabel={`${id ? id + " - Редактирование" : "Создать статью"}`}
        slice={2}
      />
      <QuestionForm parsed={question} />
    </>
  );
};

export default EditPage;
