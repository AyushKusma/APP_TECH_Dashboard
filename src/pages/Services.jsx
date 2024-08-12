import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { CustomButton } from "../components/common/CustomButton";
import { ServicesTable } from "../sections/services/ServicesTable";
import { getServices } from "../redux/slices/ServicesSlice";
import { useDispatch, useSelector } from "react-redux";
import { AddDialog } from "../components/common/AddDialog";
import { AddServices } from "../sections/services/AddServices";

export const Services = () => {
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

  const { category } = useSelector((state) => state.category);
  const { services } = useSelector((state) => state.services);

  const categoryName = category?.find((item) => item.slug === "services")?.slug;

  const categoryID = category?.find((item) => item.slug === "services")?.id;

  useEffect(() => {
    categoryName && dispatch(getServices(categoryName));
  }, [dispatch, categoryName]);

  const handleEditData = (editID) => {
    const data = services.find((item) => item.slug === editID);
    setEditData(data);
  };

  return (
    <div
      className={`w-full flex flex-col p-5 gap-5  ${
        openSB ? "ml-[18rem]" : "ml-[6rem]"
      }`}
    >
      <div className="w-full flex justify-between items-center">
        <span className="font-bold text-[1.5rem]">Services</span>
        <div onClick={() => setIsEdit(false)}>
          <CustomButton buttonName="Add Services" toggleOpen={toggleOpen} />
        </div>
      </div>
      <ServicesTable
        handleEditData={handleEditData}
        toggleOpenEdit={toggleOpenEdit}
        setIsEdit={setIsEdit}
      />
      {/* Add Services */}
      <AddDialog
        open={open}
        toggleOpen={toggleOpen}
        title="Add Services"
        max="lg"
      >
        <AddServices
          toggleOpen={toggleOpen}
          isEdit={isEdit}
          cat_id={categoryID}
        />
      </AddDialog>
      {/* Edit Services */}
      <AddDialog
        open={openEdit}
        toggleOpen={toggleOpenEdit}
        title={`Edit Services (${editData.name})`}
        max="lg"
      >
        <AddServices
          toggleOpen={toggleOpenEdit}
          cat_id={categoryID}
          editData={editData}
          isEdit={isEdit}
        />
      </AddDialog>
    </div>
  );
};
