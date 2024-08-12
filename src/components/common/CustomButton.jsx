import React from "react";

export const CustomButton = ({ buttonName, toggleOpen }) => {
  return (
    <button
      className="bg-primary px-3 py-2 text-white rounded cursor-pointer transition-all hover:bg-secondary"
      onClick={toggleOpen}
    >
      {buttonName}
    </button>
  );
};
