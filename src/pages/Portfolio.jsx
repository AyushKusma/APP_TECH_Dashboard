import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { CustomButton } from "../components/common/CustomButton";
import { PortfolioTable } from "../sections/portfolio/PortfolioTable";
import { getPortfolio } from "../redux/slices/PortfolioSlice";
import { useDispatch, useSelector } from "react-redux";
import { AddDialog } from "../components/common/AddDialog";
import { AddPortfolio } from "../sections/portfolio/AddPortfolio";

export const Portfolio = () => {
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
  const { portfolio } = useSelector((state) => state.portfolio);

  const categoryName = category?.find(
    (item) => item.slug === "portfolio"
  )?.slug;

  const categoryID = category?.find((item) => item.slug === "portfolio")?.id;

  useEffect(() => {
    categoryName && dispatch(getPortfolio(categoryName));
  }, [dispatch, categoryName]);

  const handleEditData = (editID) => {
    const data = portfolio.find((item) => item.slug === editID);
    setEditData(data);
  };

  return (
    <div
      className={`w-full flex flex-col p-5 gap-5  ${
        openSB ? "ml-[18rem]" : "ml-[6rem]"
      }`}
    >
      <div className="w-full flex justify-between items-center">
        <span className="font-bold text-[1.5rem]">Portfolio</span>
        <div onClick={() => setIsEdit(false)}>
          <CustomButton buttonName="Add Portfolio" toggleOpen={toggleOpen} />
        </div>
      </div>
      <PortfolioTable
        handleEditData={handleEditData}
        toggleOpenEdit={toggleOpenEdit}
        setIsEdit={setIsEdit}
      />
      {/* Add Portfolio */}
      <AddDialog
        open={open}
        toggleOpen={toggleOpen}
        title="Add Portfolio"
        max="lg"
      >
        <AddPortfolio
          toggleOpen={toggleOpen}
          isEdit={isEdit}
          cat_id={categoryID}
        />
      </AddDialog>
      {/* Edit Portfolio */}
      <AddDialog
        open={openEdit}
        toggleOpen={toggleOpenEdit}
        title={`Edit Portfolio (${editData.name})`}
        max="lg"
      >
        <AddPortfolio
          toggleOpen={toggleOpenEdit}
          cat_id={categoryID}
          editData={editData}
          isEdit={isEdit}
        />
      </AddDialog>
    </div>
  );
};
