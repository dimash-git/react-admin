"use client";

import React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalProps {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const Modal = ({ children, open, setOpen }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
    </Dialog>
  );
};

Modal.Trigger = DialogTrigger;
Modal.Content = DialogContent;
Modal.Header = DialogHeader;
Modal.Close = DialogClose;

export default Modal;
