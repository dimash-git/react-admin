import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import InfoBlock from "@/components/info-block";
import PassportFullscreen from "./_components/passport-fullscreen";

const UserPassportPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (session?.error == "RefreshAccessTokenError") {
    redirect("/sign-in");
  }
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let passport: UserPassport;

  try {
    const res = await axiosBack.post(
      "/user/passport/get_passport_info",
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
      throw new Error("Error loading Passport info for user");
    }

    passport = content.passport;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <>
      <InfoBlock
        title="подтвержден ли паспорт"
        content={passport?.is_verified_passport ? "Да" : "Нет"}
      />

      <PassportFullscreen id={id} passport={passport} />
    </>
  );
};

export default UserPassportPage;
