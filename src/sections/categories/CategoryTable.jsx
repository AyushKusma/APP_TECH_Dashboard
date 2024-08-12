import React from "react";
import { CategoriesTableOnly } from "./CategoriesTableOnly";

export const CategoryTable = ({
  handleEditData,
  toggleOpenEdit,
  setIsEdit,
}) => {
  return (
    <CategoriesTableOnly
      handleEditData={handleEditData}
      toggleOpenEdit={toggleOpenEdit}
      setIsEdit={setIsEdit}
    />
  );
};
