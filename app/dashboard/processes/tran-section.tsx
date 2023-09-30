import ModalPost from "@/components/modal-post";
import { Button } from "@/components/ui/button";
import DimesIcon from "@/public/icons/dimes.svg";
import TranForm from "./tran-form";

const TranSection = () => {
  return (
    <div className="p-5 mb-[30px] bg-thDark flex flex-col gap-5 rounded-[20px] w-full">
      <div className="flex items-center justify-between">
        <span className="text-[23px] font-bold">Транзакции</span>
        <DimesIcon />
      </div>

      <div className="flex flex-col space-y-5">
        <ModalPost Form={TranForm} title="Начисление">
          <Button
            asChild
            variant="formSubmit"
            className="text-[16px] w-full"
            size="md"
            type="button"
          >
            <span>Начисление</span>
          </Button>
        </ModalPost>
        <ModalPost Form={TranForm} title="Списание" card={{ type: "decrease" }}>
          <Button
            asChild
            variant="destructive"
            className="text-[16px] w-full font-bold"
            size="md"
            type="button"
          >
            <span>Списание</span>
          </Button>
        </ModalPost>
      </div>
    </div>
  );
};

export default TranSection;
