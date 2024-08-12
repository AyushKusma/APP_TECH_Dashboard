import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { CustomButton } from "../components/common/CustomButton";
import { TeamsTable } from "../sections/teams/TeamsTable";
import { getTeams } from "../redux/slices/TeamsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AddDialog } from "../components/common/AddDialog";
import { AddTeams } from "../sections/teams/AddTeams";

export const Teams = () => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState("");
  const { openSB } = useContext(SidebarContext);
  const dispatch = useDispatch();

  function toggleOpen() {
    setOpen(!open);
  }

  function toggleOpenEdit() {
    setOpenEdit(!openEdit);
  }

  const { teams } = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const handleEditData = (editID) => {
    const data = teams.find((item) => item.id === editID);
    setEditData(data);
  };

  return (
    <div
      className={`w-full flex flex-col p-5 gap-5  ${
        openSB ? "ml-[18rem]" : "ml-[6rem]"
      }`}
    >
      <div className="w-full flex justify-between items-center">
        <span className="font-bold text-[1.5rem]">Teams</span>
        <div onClick={() => setIsEdit(false)}>
          <CustomButton buttonName="Add Teams" toggleOpen={toggleOpen} />
        </div>
      </div>
      <TeamsTable
        handleEditData={handleEditData}
        toggleOpenEdit={toggleOpenEdit}
        setIsEdit={setIsEdit}
      />
      {/* Add Teams */}
      <AddDialog open={open} toggleOpen={toggleOpen} title="Add Teams" max="sm">
        <AddTeams toggleOpen={toggleOpen} isEdit={isEdit} />
      </AddDialog>
      {/* Edit Teams */}
      <AddDialog
        open={openEdit}
        toggleOpen={toggleOpenEdit}
        title={`Edit Teams (${editData.name})`}
        max="sm"
      >
        <AddTeams
          toggleOpen={toggleOpenEdit}
          editData={editData}
          isEdit={isEdit}
        />
      </AddDialog>
    </div>
  );
};
