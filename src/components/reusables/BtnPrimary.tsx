import React from "react";

const BtnPrimary = ({ children }: { children: string }) => {
  return (
    <button className="flex items-center text-md px-6 py-3 text-white rounded-3xl hover:opacity-90 hover:scale-110 shadow-xl bg-[#509CDB] group duration-300 ease-in-out">
      {children}
    </button>
  );
};

export default BtnPrimary;
