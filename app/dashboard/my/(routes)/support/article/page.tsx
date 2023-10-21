import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { redirect } from "next/navigation";

import Breadcrumbs from "@/components/breadcrumbs";
import ArticleForm from "./_components/article-form";
import ArticleDelButton from "./_components/article-del-button";

const SubCategoriesPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(authOptions);
  if (session?.error == "RefreshAccessTokenError") {
    redirect("/sign-in");
  }
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let article: Article;
  try {
    const res = await axiosBack.post(
      "/support/get_article",
      {
        question_id: searchParams?.question_id,
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
      throw new Error("Error loading Article");
    }

    article = content.article;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <>
      <Breadcrumbs
        customLabel={
          article
            ? `${searchParams?.question_id} - Редактирование`
            : "Создать статью"
        }
      />
      {article && <ArticleDelButton id={article.question_id} />}
      {article ? <ArticleForm parsed={article} /> : <ArticleForm />}
    </>
  );
};

export default SubCategoriesPage;
