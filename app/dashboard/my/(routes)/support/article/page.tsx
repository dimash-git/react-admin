import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";

import Breadcrumbs from "@/components/breadcrumbs";

import ArticleForm from "./_components/article-form";

import ArticleDelButton from "./_components/article-del-button";

const SubCategoriesPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  // const res = await axiosBack.post(
  //   "/support/get_article",
  //   {
  //     question_id: searchParams?.question_id,
  //   },
  //   {
  //     headers: {
  //       Authorization: apiKey,
  //     },
  //   }
  // );

  // const { status, content } = res.data;
  // console.log(content);

  // if (status.code != 200) return <div>Ошибка загрузки поста</div>;

  // const { article } = content;
  const article = false;

  return (
    <>
      <Breadcrumbs
        customLabel={
          article
            ? `${searchParams?.question_id} - Редактирование`
            : "Создать статью"
        }
      />
      <ArticleDelButton id="" />
      {article ? <ArticleForm parsed={article} /> : <ArticleForm />}
    </>
  );
};

export default SubCategoriesPage;
