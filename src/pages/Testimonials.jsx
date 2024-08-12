import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { CustomButton } from "../components/common/CustomButton";
import { TestimonialsTable } from "../sections/testimonials/TestimonialsTable";
import { getTestimonials } from "../redux/slices/TestimonialsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AddDialog } from "../components/common/AddDialog";
import { AddTestimonials } from "../sections/testimonials/AddTestimonials";

export const Testimonials = () => {
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

  const { testimonials } = useSelector((state) => state.testimonials);

  useEffect(() => {
    dispatch(getTestimonials());
  }, [dispatch]);

  const handleEditData = (editID) => {
    const data = testimonials.find((item) => item.id === editID);
    setEditData(data);
  };

  return (
    <div
      className={`w-full flex flex-col p-5 gap-5  ${
        openSB ? "ml-[18rem]" : "ml-[6rem]"
      }`}
    >
      <div className="w-full flex justify-between items-center">
        <span className="font-bold text-[1.5rem]">Testimonials</span>
        <div onClick={() => setIsEdit(false)}>
          <CustomButton buttonName="Add Testimonials" toggleOpen={toggleOpen} />
        </div>
      </div>
      <TestimonialsTable
        handleEditData={handleEditData}
        toggleOpenEdit={toggleOpenEdit}
        setIsEdit={setIsEdit}
      />
      {/* Add Testimonials */}
      <AddDialog
        open={open}
        toggleOpen={toggleOpen}
        title="Add Testimonials"
        max="sm"
      >
        <AddTestimonials toggleOpen={toggleOpen} isEdit={isEdit} />
      </AddDialog>
      {/* Edit Testimonials */}
      <AddDialog
        open={openEdit}
        toggleOpen={toggleOpenEdit}
        title={`Edit Testimonials (${editData.name})`}
        max="sm"
      >
        <AddTestimonials
          toggleOpen={toggleOpenEdit}
          editData={editData}
          isEdit={isEdit}
        />
      </AddDialog>
    </div>
  );
};
