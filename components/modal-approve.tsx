"use client";

import { useState } from "react";

import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { useRouter } from "next/navigation";
import axios from "axios";

const ModalApprove = ({
  id,
  apiUrl,
  what,
  messages,
  children,
  redirectUrl,
}: {
  id: string;
  apiUrl: string;
  what: string;
  messages: {
    error: string;
    success: string;
  };
  children: React.ReactNode;
  redirectUrl?: string;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const handleApprove = async () => {
    const res = await axios.post(apiUrl, {
      id,
    });

    const { status } = res.data;
    if (status != 200) {
      toast({
        variant: "destructive",
        title: `Ошибка при одобрении ${messages.error}`,
      });
      return;
    }

    toast({
      variant: "success",
      title: `${messages.success} успешно одобрен!`,
    });

    setOpen(false);
    router.refresh();

    if (!redirectUrl) return;
    router.push(redirectUrl);
  };
  return (
    <Modal open={open} setOpen={setOpen}>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Content className="max-w-[355px] bg-[#2D3D52] p-5 rounded-[20px]">
        <div className="flex flex-col space-y-6">
          <h4 className="text-md font-semibold">Одобрить {what}</h4>
          <p className="font-medium text-[14px]">
            Вы уверены что хотите одобрить {what}?
          </p>
          <div className="flex gap-6 w-full">
            <Button
              variant="modal"
              size="lg"
              className="w-full"
              onClick={handleApprove}
            >
              Одобрить
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

export default ModalApprove;
