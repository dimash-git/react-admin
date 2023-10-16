"use client";

import { useState } from "react";

import Trash from "@/public/icons/trash.svg";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { useRouter } from "next/navigation";
import axios from "axios";
import { cn } from "@/lib/utils";

const ModalDelete = ({
  id,
  apiUrl,
  what,
  messages,
  btn,
}: {
  id: string;
  apiUrl: string;
  what: string;
  messages: {
    error: string;
    success: string;
  };
  btn?: boolean;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      const res = await axios.post(apiUrl, {
        id,
      });

      const { status } = res.data;
      if (status != 200) {
        throw new Error("Error Deleting Post");
      }

      toast({
        variant: "success",
        title: `${messages.success} успешно удалена!`,
      });

      setOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: `Ошибка при удалении ${messages.error}`,
      });
    } finally {
      router.refresh();
    }
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <Modal.Trigger
        className={cn(
          btn
            ? null
            : "inline-flex items-center justify-center rounded-[5px] font-medium bg-thRed text-white hover:bg-thRed/90 h-[25px] py-[5px] px-ten"
        )}
      >
        {btn ? (
          <Button asChild variant="formSubmit">
            <span>Удалить</span>
          </Button>
        ) : (
          <Trash />
        )}
      </Modal.Trigger>
      <Modal.Content className="max-w-[355px] bg-[#2D3D52] p-5 rounded-[20px]">
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
