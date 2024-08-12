import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { CustomButton } from "../components/common/CustomButton";
import { CategoryTable } from "../sections/categories/CategoryTable";
import { useDispatch, useSelector } from "react-redux";
import { AddDialog } from "../components/common/AddDialog";
import { AddCategory } from "../sections/categories/AddCategory";

export const Categories = () => {
  const { openSB } = useContext(SidebarContext);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [categoryID, setCategoryID] = useState([]);
  const [editData, setEditData] = useState("");

  const dispatch = useDispatch();

  const { category } = useSelector((state) => state.category);

  function setCategoryId() {
    const filterCategoryID = category.filter(
      (item) => item.category_id === null
    );
    setCategoryID(filterCategoryID.map((item) => item));
  }

  function toggleOpen() {
    setOpen(!open);
  }

  function toggleOpenEdit() {
    setOpenEdit(!openEdit);
  }

  useEffect(() => {
    setCategoryId();
  }, [category]);

  const handleEditData = (editID) => {
    const data = category.find((item) => item.id === editID);
    setEditData(data);
  };

  return (
    <div
      className={`w-full flex flex-col p-5 gap-5  ${
        openSB ? "ml-[18rem]" : "ml-[6rem]"
      }`}
    >
      <div className="w-full flex justify-between items-center">
        <span className="font-bold text-[1.5rem]">Categories</span>
        <div onClick={() => setIsEdit(false)}>
          <CustomButton buttonName="Add Categories" toggleOpen={toggleOpen} />
        </div>
      </div>
      <CategoryTable
        handleEditData={handleEditData}
        toggleOpenEdit={toggleOpenEdit}
        setIsEdit={setIsEdit}
      />
      {/* Add Category */}
      <AddDialog open={open} toggleOpen={toggleOpen} title="Add Category">
        <AddCategory
          toggleOpen={toggleOpen}
          data={categoryID}
          isEdit={isEdit}
        />
      </AddDialog>
      {/* Edit Category */}
      <AddDialog
        open={openEdit}
        toggleOpen={toggleOpenEdit}
        title={`Edit Category (${editData.name})`}
      >
        <AddCategory
          toggleOpen={toggleOpenEdit}
          data={categoryID}
          editData={editData}
          isEdit={isEdit}
        />
      </AddDialog>
    </div>
  );
};
