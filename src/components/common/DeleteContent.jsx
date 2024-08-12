import React from "react";

export const DeleteContent = ({
  deleteWhat,
  toggleDeleteForm,
  deleteFunc,
  delID,
}) => {
  return (
    <div>
      <div className="pb-2">Are you sure you want to delete {deleteWhat}?</div>
      <div className="flex justify-between gap-2">
        <button
          className="border-2 w-full border-red-500 text-red-500 rounded-lg flex justify-center items-center px-4 shadow-md hover:bg-red-500 hover:text-white transition-all cursor-pointer"
          onClick={toggleDeleteForm}
        >
          Cancel
        </button>
        <button
          className="flex w-full justify-center items-center gap-2 rounded-lg shadow-md p-2 px-4 text-white transition-all bg-primary hover:bg-secondary"
          onClick={() => {
            toggleDeleteForm(), deleteFunc(delID);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
