import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkToken } from "../../redux/slices/AuthSlice";

export const ProtectedRoute = ({ element }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);
  const { auth } = useSelector((state) => state.auth);

  console.log(auth, "PROTCROUT");

  return auth ? element : <Navigate to="/login" replace />;
};
