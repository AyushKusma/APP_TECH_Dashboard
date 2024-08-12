import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FormProvider } from "../../components/form/FormProvider";
import { FormTextField } from "../../components/form/FormTextField";
import { FormUploadImage } from "../../components/form/FormUploadImage";
import { addTeams, editTeams } from "../../redux/slices/TeamsSlice";
import slugGenerator from "../../utils/slugGenerator";

export const AddTeams = ({ toggleOpen, isEdit, editData }) => {
  const dispatch = useDispatch();

  // Upload Photo
  const [file, setFile] = useState(null);

  const onSingleDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles) {
      const file = acceptedFiles[0];
      setFile(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          key: new Date().getTime(),
        })
      );
    }
  }, []);

  const handleRemovePhoto = () => {
    setFile(null);
  };

  const { teamsLoading } = useSelector((state) => state.teams);

  const Schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
    order: Yup.number().required("Order is required"),
    designation: Yup.string().required("Designation is required"),
    email: Yup.string().required("Email is required"),
  });

  const defaultValues = useMemo(() => ({
    id: editData?.id || "",
    name: editData?.name || "",
    phone: editData?.phone || "",
    order: editData?.order || "",
    designation: editData?.designation || "",
    email: editData?.email || "",
    image: editData?.image || null,
  }));

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onAddSubmit = (data) => {
    const formData = new FormData();
    if (data.image === null) {
      toast.error("Please select an image");
      return;
    }
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("order", data.order);
    formData.append("designation", data.designation);
    formData.append("email", data.email);
    formData.append("image", data.image[0]);

    dispatch(
      addTeams({
        data: formData,
        toggleOpen: toggleOpen,
      })
    );
  };

  const onEditSubmit = (data) => {
    const formData = new FormData();
    if (data.image === null) {
      toast.error("Please select an image");
      return;
    }
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("order", data.order);
    formData.append("designation", data.designation);
    formData.append("email", data.email);
    formData.append("image", data.image || data.image[0]);

    dispatch(
      editTeams({
        data: formData,
        id: data.id,
        toggleOpen: toggleOpen,
      })
    );
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={isEdit ? handleSubmit(onEditSubmit) : handleSubmit(onAddSubmit)}
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <FormTextField name="name" label="Name" type="text" />
          <FormTextField name="phone" label="Phone" type="text" />
        </div>
        <div className="flex gap-2">
          <FormTextField name="email" label="Email" type="email" />
          <FormTextField name="order" label="Order" type="number" />
        </div>
        <FormTextField
          name="designation"
          label="Designation"
          type="text"
          multiline={true}
          rows={3}
        />

        <div className="flex flex-col w-full">
          <span className="font-bold p-2">Upload Your Image Here *</span>
          <FormUploadImage
            name="image"
            file={file || defaultValues?.image}
            onDrop={onSingleDrop}
            onRemove={handleRemovePhoto}
          />
          <span className="flex justify-center font-bold">
            Your image must be in a ratio of 1:1 (720 x 720) pixels
          </span>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-5">
        <span
          className="border-2 border-red-500 text-red-500 rounded-lg flex justify-center items-center px-4 shadow-md hover:bg-red-500 hover:text-white transition-all cursor-pointer"
          onClick={toggleOpen}
        >
          Cancel
        </span>
        <button
          type="submit"
          disabled={teamsLoading}
          className={`${
            teamsLoading ? "bg-gray-500" : "bg-primary hover:bg-secondary"
          } flex gap-2 rounded-lg shadow-md p-2 px-4 text-white transition-all `}
        >
          {teamsLoading ? (
            <CircularProgress
              sx={{
                color: "white",
              }}
              size={24}
            />
          ) : null}
          {isEdit ? "Edit Teams" : "Add Teams"}
        </button>
      </div>
    </FormProvider>
  );
};
