import React from "react";
import { BlogsTableOnly } from "./BlogsTableOnly";

export const BlogsTable = ({ handleEditData, toggleOpenEdit, setIsEdit }) => {
  return (
    <div>
      <BlogsTableOnly
        handleEditData={handleEditData}
        toggleOpenEdit={toggleOpenEdit}
        setIsEdit={setIsEdit}
      />
    </div>
  );
};
