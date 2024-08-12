import React from "react";
import { TeamsTableOnly } from "./TeamsTableOnly";

export const TeamsTable = ({ handleEditData, toggleOpenEdit, setIsEdit }) => {
  return (
    <div>
      <TeamsTableOnly
        handleEditData={handleEditData}
        toggleOpenEdit={toggleOpenEdit}
        setIsEdit={setIsEdit}
      />
    </div>
  );
};
