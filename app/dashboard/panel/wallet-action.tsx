"use client";

import { useState } from "react";

import Modal from "@/components/modal";
import WalletForm from "./wallet-form";
import { Button } from "@/components/ui/button";

const WalletAction = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Modal open={open} setOpen={setOpen}>
        <Modal.Trigger className="w-full">
          <Button
            asChild
            variant="formSubmit"
            size="md"
            className="text-[16px] h-10 w-full"
          >
            <span>Изменить данные</span>
          </Button>
        </Modal.Trigger>
        <Modal.Content className="max-w-[355px] bg-[#2D3D52] p-5 rounded-[20px]">
          <div className="flex flex-col space-y-5">
            <div className="text-[20px] font-semibold">Изменить кошельки</div>
            {/* FORM */}
            <WalletForm setOpen={setOpen} />
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default WalletAction;
