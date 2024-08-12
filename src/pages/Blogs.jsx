import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { CustomButton } from "../components/common/CustomButton";
import { BlogsTable } from "../sections/blogs/BlogsTable";
import { getBlogs } from "../redux/slices/BlogsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AddDialog } from "../components/common/AddDialog";
import { AddBlogs } from "../sections/blogs/AddBlogs";

export const Blogs = () => {
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
  const { blogs } = useSelector((state) => state.blogs);

  const categoryName = category?.find((item) => item.slug === "blog")?.slug;

  const categoryID = category?.find((item) => item.slug === "blog")?.id;

  useEffect(() => {
    categoryName && dispatch(getBlogs(categoryName));
  }, [dispatch, categoryName]);

  const handleEditData = (editID) => {
    const data = blogs.find((item) => item.slug === editID);
    setEditData(data);
  };

  return (
    <div
      className={`w-full flex flex-col p-5 gap-5  ${
        openSB ? "ml-[18rem]" : "ml-[6rem]"
      }`}
    >
      <div className="w-full flex justify-between items-center">
        <span className="font-bold text-[1.5rem]">Blogs</span>
        <div onClick={() => setIsEdit(false)}>
          <CustomButton buttonName="Add Blogs" toggleOpen={toggleOpen} />
        </div>
      </div>
      <BlogsTable
        handleEditData={handleEditData}
        toggleOpenEdit={toggleOpenEdit}
        setIsEdit={setIsEdit}
      />
      {/* Add Blogs */}
      <AddDialog open={open} toggleOpen={toggleOpen} title="Add Blogs" max="lg">
        <AddBlogs toggleOpen={toggleOpen} isEdit={isEdit} cat_id={categoryID} />
      </AddDialog>
      {/* Edit Blogs */}
      <AddDialog
        open={openEdit}
        toggleOpen={toggleOpenEdit}
        title={`Edit Blogs (${editData.name})`}
        max="lg"
      >
        <AddBlogs
          toggleOpen={toggleOpenEdit}
          cat_id={categoryID}
          editData={editData}
          isEdit={isEdit}
        />
      </AddDialog>
    </div>
  );
};
