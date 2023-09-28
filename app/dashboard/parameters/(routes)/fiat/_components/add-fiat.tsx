"use client";

import FiatForm from "./fiat-form";
import ModalPost from "@/components/modal-post";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

const AddFiat = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!buttonRef.current) return;

    const url = window.location.href;
    const params = url.split("?");
    if (params.includes("add") && buttonRef.current) {
      buttonRef.current.click();
    }
  }, []);
  return (
    <div className="max-w-[200px]">
      <ModalPost Form={FiatForm} title="Добавить фиат">
        <Button
          asChild
          variant="formSubmit"
          size="md"
          className="text-[16px] h-10"
          ref={buttonRef}
        >
          <span>Добавить фиат</span>
        </Button>
      </ModalPost>
    </div>
  );
};

export default AddFiat;
