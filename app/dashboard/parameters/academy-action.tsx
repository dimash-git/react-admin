"use client";

import { useState } from "react";

import Modal from "@/components/modal";
import AcademyForm from "./academy-form";

const AcademyAction = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Modal open={open} setOpen={setOpen}>
        <Modal.Trigger className="py-ten px-10 w-full text-[16px] leading-[18px] inline-flex items-center justify-center rounded-[5px] font-bold bg-thBlue text-white hover:bg-thBlue/90 ">
          Изменить данные
        </Modal.Trigger>
        <Modal.Content className="max-w-[355px] bg-[#2D3D52] p-5 rounded-[20px]">
          <div className="flex flex-col space-y-5">
            <div className="text-[20px] font-semibold">
              Изменить данные для Академии
            </div>
            {/* FORM */}
            <AcademyForm setOpen={setOpen} />
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default AcademyAction;
