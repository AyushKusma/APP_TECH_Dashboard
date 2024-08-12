import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FormProvider } from "../../components/form/FormProvider";
import { FormTextField } from "../../components/form/FormTextField";
import { FormUploadImage } from "../../components/form/FormUploadImage";
import {
  addTestimonials,
  editTestimonials,
} from "../../redux/slices/TestimonialsSlice";
import { FormSwitchButton } from "../../components/form/FormSwitchButton";

export const AddTestimonials = ({ toggleOpen, isEdit, editData }) => {
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

  const { testimonialsLoading } = useSelector((state) => state.testimonials);

  const Schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    review: Yup.string().required("Review is required"),
    designation: Yup.string().required("Designation is required"),
  });

  const defaultValues = useMemo(() => ({
    id: editData?.id || "",
    name: editData?.name || "",
    review: editData?.review || "",
    show: editData?.show === 1 ? true : false || false,
    designation: editData?.designation || "",
    image: editData?.image || false,
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
    formData.append("show", data.show ? 1 : 0);
    formData.append("name", data.name);
    formData.append("review", data.review);
    formData.append("designation", data.designation);
    formData.append("image", data.image[0]);

    dispatch(
      addTestimonials({
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
    formData.append("id", data.id);
    formData.append("show", data.show ? 1 : 0);
    formData.append("name", data.name);
    formData.append("review", data.review);
    formData.append("designation", data.designation);
    formData.append("image", data.image || data.image[0]);

    dispatch(
      editTestimonials({
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
        <div className="flex justify-end">
          <FormSwitchButton name="show" label="Show" />
        </div>
        <div className="flex gap-2">
          <FormTextField name="name" label="Name" type="text" />
        </div>
        <div className="flex gap-2">
          <FormTextField name="designation" label="Designation" type="text" />
        </div>
        <FormTextField
          name="review"
          label="Review"
          type="text"
          multiline={true}
          rows={4}
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
          disabled={testimonialsLoading}
          className={`${
            testimonialsLoading
              ? "bg-gray-500"
              : "bg-primary hover:bg-secondary"
          } flex gap-2 rounded-lg shadow-md p-2 px-4 text-white transition-all `}
        >
          {testimonialsLoading ? (
            <CircularProgress
              sx={{
                color: "white",
              }}
              size={24}
            />
          ) : null}
          {isEdit ? "Edit Testimonials" : "Add Testimonials"}
        </button>
      </div>
    </FormProvider>
  );
};
