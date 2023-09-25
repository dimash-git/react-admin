"use client";

import { useState } from "react";

import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";

interface FormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parsed?: any;
}

const ModalPost = ({
  children,
  title,
  Form,
  card,
}: {
  children: React.ReactNode;
  title: string;
  Form: React.FC<FormProps>;
  card?: any;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Modal open={open} setOpen={setOpen}>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Content className="max-w-[355px] bg-[#2D3D52] p-5 rounded-[20px]">
        <div className="flex flex-col space-y-6">
          <h4 className="text-md font-semibold">{title}</h4>
          <Form setOpen={setOpen} parsed={card} />
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default ModalPost;
