"use client";

import React, { useState } from "react";
import GraphIcon from "@/public/icons/graph.svg";

import { Button } from "@/components/ui/button";

import Modal from "@/components/modal";
import CoefForm from "./coef-form";

const CoefSection = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="p-5 mb-[30px] bg-thDark flex flex-col gap-5 rounded-[20px] w-full">
      <div className="flex items-center justify-between">
        <span className="text-[23px] font-bold">Коэффициент </span>
        <GraphIcon />
      </div>

      <div className="flex flex-col space-y-[10px]">
        <div className="text-[12px] font-medium uppercase">
          Коэффициент перевода единиц
        </div>
        <div className="text-[15px] font-medium uppercase">500</div>
        <Modal open={open} setOpen={setOpen}>
          <Modal.Trigger className="w-full">
            <Button
              asChild
              variant="formSubmit"
              size="md"
              className="text-[16px] h-10 w-full"
            >
              <span>Изменить коэффициент </span>
            </Button>
          </Modal.Trigger>
          <Modal.Content className="max-w-[355px] bg-[#2D3D52] p-5 rounded-[20px]">
            <div className="flex flex-col space-y-5">
              <div className="text-[20px] font-semibold">
                Изменить коэффициент
              </div>
              {/* FORM */}
              <CoefForm setOpen={setOpen} />
            </div>
          </Modal.Content>
        </Modal>
      </div>
    </div>
  );
};

export default CoefSection;
