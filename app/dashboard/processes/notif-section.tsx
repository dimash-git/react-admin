import ModalPost from "@/components/modal-post";
import { Button } from "@/components/ui/button";
import BellIcon from "@/public/icons/bell.svg";
import NotifForm from "./notif-form";

const NotifSection = () => {
  return (
    <div className="p-5 mb-[30px] bg-thDark flex flex-col gap-5 rounded-twenty w-full">
      <div className="flex items-center justify-between">
        <span className="text-[23px] font-bold">Уведомления</span>
        <BellIcon />
      </div>

      <div className="flex flex-col space-y-[10px]">
        <ModalPost Form={NotifForm} title="Отправить уведомление ">
          <Button
            asChild
            variant="formSubmit"
            className="text-[16px] w-full"
            size="md"
            type="button"
          >
            <span>Отправить уведомление пользователям</span>
          </Button>
        </ModalPost>
      </div>
    </div>
  );
};

export default NotifSection;
