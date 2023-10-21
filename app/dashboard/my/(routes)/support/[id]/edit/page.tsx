import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import Breadcrumbs from "@/components/breadcrumbs";
import QuestionForm from "../../_components/qa-form";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (session?.error == "RefreshAccessTokenError") {
    redirect("/sign-in");
  }
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let question: Question;
  try {
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

    if (status.code != 200) {
      throw new Error("Error loading Support Question");
    }

    question = content.question;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

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
