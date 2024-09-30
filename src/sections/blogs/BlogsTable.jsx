import React from "react";
import { BlogsTableOnly } from "./BlogsTableOnly";

export const BlogsTable = ({
  handleEditData,
  toggleOpenEdit,
  setIsEdit,
  setIsView,
}) => {
  return (
    <div>
      <BlogsTableOnly
        handleEditData={handleEditData}
        toggleOpenEdit={toggleOpenEdit}
        setIsEdit={setIsEdit}
        setIsView={setIsView}
      />
    </div>
  );
};
