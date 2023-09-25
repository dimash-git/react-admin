"use client";

import Trash from "@/public/icons/trash.svg";
import { Button } from "@/components/ui/button";
import Modal from "@/components/modal";
import { useToast } from "@/components/ui/use-toast";

import axios from "axios";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setOpen } from "@/redux/features/modalDeleteSlice";

const ModalDelete = () => {
  const { toast } = useToast();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const modalState = useAppSelector((state) => state.modalDelete);

  const { apiUrl, id, mess, what, open } = modalState;

  const handleDelete = async () => {
    const res = await axios.post(apiUrl, {
      id,
    });

    const { status } = res.data;

    if (status != 200) {
      toast({
        variant: "destructive",
        title: `Ошибка при удалении ${mess.error}`,
      });
      return;
    }

    toast({
      variant: "success",
      title: `${mess.success} успешно удалена!`,
    });

    dispatch(setOpen());
    router.refresh();
  };

  const onOpen = (open: boolean) => {};

  return (
    <Modal open={open}>
      <Modal.Trigger className="inline-flex items-center justify-center rounded-[5px] font-medium bg-thRed text-white hover:bg-thRed/90 h-[25px] py-[5px] px-ten">
        <Trash />
      </Modal.Trigger>
      <Modal.Content className="max-w-[462px] bg-[#2D3D52] p-5 rounded-[20px]">
        <div className="flex flex-col space-y-6">
          <h4 className="text-md font-semibold">Удалить {what}</h4>
          <p className="font-medium text-[14px]">
            Вы уверены что хотите удалить {what}?
          </p>
          <div className="flex gap-6 w-full">
            <Button
              variant="modal"
              size="lg"
              className="w-full"
              onClick={handleDelete}
            >
              Удалить
            </Button>
            <Modal.Close asChild>
              <Button
                variant="modal"
                size="lg"
                className="w-full bg-thBlue hover:bg-thBlue/80"
                onClick={() => dispatch(setOpen())}
              >
                Отмена
              </Button>
            </Modal.Close>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default ModalDelete;
