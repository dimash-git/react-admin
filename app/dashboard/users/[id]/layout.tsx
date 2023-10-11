import UserTabs from "../_components/user-tabs";
import { usersTabs } from "../nav";

const UsersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <UserTabs links={usersTabs} />
      {children}
    </>
  );
};

export default UsersLayout;
