import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PassportFullscreen from "./_components/passport-fullscreen";
import { redirect } from "next/navigation";

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

    console.log(res.data);

    const { status, content } = res.data;

    if (status.code != 200) {
      throw new Error("Error loading Passport info for user");
    }

    passport = content.two_fa_info;
    console.log(passport);
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <>
      <div className="flex flex-col space-y-[10px]">
        <span className="font-medium text-[12px] leading-3 uppercase">
          подтвержден ли паспорт
        </span>
        <span className="font-bold text-[20px] leading-4">Да</span>
      </div>
      <PassportFullscreen id={id} passport={passport} />
    </>
  );
};

export default UserPassportPage;
