import { DialogTrigger } from "@radix-ui/react-dialog";
import React from "react";

type DialogBtnProps = {
  children: React.ReactNode;
  disabled?: boolean | false;
  onClick?: () => void;
};

const DialogTriggerBtn = ({ children, onClick, disabled }: DialogBtnProps) => {
  return (
    <DialogTrigger asChild>
      <button
        disabled={disabled}
        onClick={onClick}
        className="flex items-center text-md px-6 py-3 text-white rounded-3xl hover:opacity-90 hover:scale-110 shadow-xl bg-[#509CDB] group duration-300 ease-in-out"
      >
        {children}
      </button>
    </DialogTrigger>
  );
};

export default DialogTriggerBtn;
