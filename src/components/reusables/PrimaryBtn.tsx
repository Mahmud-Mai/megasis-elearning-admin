import React from "react";

type DialogBtnProps = {
  children: React.ReactNode;
  isProcessing?: boolean;
  onClick?: () => void | Promise<void>;
  className?: string;
  variant?: "primary" | "secondary" | "delete" | "cancel";
};

const PrimaryBtn = ({
  children,
  className,
  onClick,
  isProcessing,
  variant
}: DialogBtnProps) => {
  const baseClasses = `flex items-center text-md px-6 py-3 rounded-3xl hover:opacity-90 hover:scale-110 shadow-xl group duration-300 ease-in-out`;

  const getVariantClass = () => {
    switch (variant) {
      case "secondary":
        return "bg-[#152259] text-white";
      case "cancel":
        return "bg-gray-300 text-black";
      case "delete":
        return "bg-red-600 text-white";
      default:
        return "bg-[#509CDB] text-white";
    }
  };

  return (
    <button
      disabled={isProcessing}
      onClick={onClick}
      className={`${baseClasses} ${className} ${getVariantClass()}`}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn;
