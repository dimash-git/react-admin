"use client";

import ModalPost from "@/components/modal-post";
import { Button } from "@/components/ui/button";
import SymbolsForm from "./symbols-form";
import { useEffect, useRef } from "react";

const AddSymbol = () => {
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
    <div>
      <ModalPost Form={SymbolsForm} title="Добавить символ">
        <Button
          asChild
          variant="formSubmit"
          size="md"
          className="text-[16px] h-10"
          ref={buttonRef}
        >
          <span>Добавить символ</span>
        </Button>
      </ModalPost>
    </div>
  );
};

export default AddSymbol;
