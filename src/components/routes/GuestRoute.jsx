import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkToken } from "../../redux/slices/AuthSlice";

export const GuestRoute = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);
  const { auth } = useSelector((state) => state.auth);

  return auth ? <Navigate to={"/dashboard"} /> : children;
};
