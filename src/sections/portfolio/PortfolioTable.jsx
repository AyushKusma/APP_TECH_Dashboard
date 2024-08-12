import React from "react";
import { PortfolioTableOnly } from "./PortfolioTableOnly";

export const PortfolioTable = ({
  handleEditData,
  toggleOpenEdit,
  setIsEdit,
}) => {
  return (
    <div>
      <PortfolioTableOnly
        handleEditData={handleEditData}
        toggleOpenEdit={toggleOpenEdit}
        setIsEdit={setIsEdit}
      />
    </div>
  );
};
