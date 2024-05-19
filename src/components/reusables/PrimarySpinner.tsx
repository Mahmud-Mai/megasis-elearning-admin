import React from "react";
import { InfinitySpin } from "react-loader-spinner";

type Props = {};

const PrimarySpinner = (props: Props) => {
  return (
    <div className="w-full flex justify-center mt-14">
      <InfinitySpin width="200" color="#2D88D4" />
    </div>
  );
};

export default PrimarySpinner;
