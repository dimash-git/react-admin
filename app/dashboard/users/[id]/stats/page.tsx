import MlmStatsChart from "./_components/mlm-stats";

const UserStatsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <>
      <div className="flex flex-col space-y-[30px]">
        <MlmStatsChart id={id} />
      </div>
    </>
  );
};

export default UserStatsPage;
