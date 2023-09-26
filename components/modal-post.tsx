"use client";

import { useState } from "react";

import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parsed?: any;
}

const ModalPost = ({
  children,
  title,
  Form,
  card,
  maxWidth,
}: {
  children: React.ReactNode;
  title: string;
  Form: React.FC<FormProps>;
  card?: any;
  maxWidth?: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Modal open={open} setOpen={setOpen}>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Content
        className={cn(
          "bg-[#2D3D52] p-5 rounded-[20px]",
          maxWidth ?? "max-w-[355px]"
        )}
      >
        <div className="flex flex-col space-y-3">
          <h4 className="text-xl font-semibold">{title}</h4>
          <Form setOpen={setOpen} parsed={card} />
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default ModalPost;
