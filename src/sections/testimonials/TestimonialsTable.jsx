import React from "react";
import { TestimonialsTableOnly } from "./TestimonialsTableOnly";

export const TestimonialsTable = ({
  handleEditData,
  toggleOpenEdit,
  setIsEdit,
}) => {
  return (
    <div>
      <TestimonialsTableOnly
        handleEditData={handleEditData}
        toggleOpenEdit={toggleOpenEdit}
        setIsEdit={setIsEdit}
      />
    </div>
  );
};
