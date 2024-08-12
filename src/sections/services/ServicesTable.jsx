import React from "react";
import { ServicesTableOnly } from "./ServicesTableOnly";

export const ServicesTable = ({
  handleEditData,
  toggleOpenEdit,
  setIsEdit,
}) => {
  return (
    <div>
      <ServicesTableOnly
        handleEditData={handleEditData}
        toggleOpenEdit={toggleOpenEdit}
        setIsEdit={setIsEdit}
      />
    </div>
  );
};
