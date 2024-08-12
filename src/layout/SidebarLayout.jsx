import React, { useEffect } from "react";
import { Sidebar } from "../components/common/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/slices/CategorySlice";

export const SidebarLayout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories({ limit: 100 }));
  }, [dispatch]);
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
};
