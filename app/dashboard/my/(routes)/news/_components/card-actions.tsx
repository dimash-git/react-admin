"use client";

import Trash from "@/public/icons/trash.svg";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CardActionsProps {
  id: string;
}

const CardActions = ({ id }: CardActionsProps) => {
  const pathname = usePathname();
  const { toast } = useToast();
  const router = useRouter();

  // console.log("id", id);

  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    const res = await axios.post("/api/news/delete", {
      id,
    });

    const { status } = res.data;
    console.log(res.data);

    if (status != 200) {
      toast({
        variant: "success",
        title: "Ошибка при удалении новости!",
      });
      return;
    }

    toast({
      variant: "success",
      title: "Новость удалена успешно!",
    });
    setOpen(false);
    router.refresh();
  };

  return (
    <>
      <Link href={`${pathname}/${id}/edit`}>
        <Button>Редактировать</Button>
      </Link>

      {/* Delete Button */}
      <Modal open={open} setOpen={setOpen}>
        <Modal.Trigger className="inline-flex items-center justify-center rounded-[5px] font-medium bg-thRed text-white hover:bg-thRed/90 h-[25px] py-[5px] px-ten">
          <Trash />
        </Modal.Trigger>
        <Modal.Content className="max-w-[462px] bg-[#2D3D52] p-5 rounded-[20px]">
          <div className="flex flex-col space-y-6">
            <h4 className="text-md font-semibold">Удалить новость</h4>
            <p className="font-medium text-[14px]">
              Вы уверены что хотите удалить новость?
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
    </>
  );
};

export default CardActions;
