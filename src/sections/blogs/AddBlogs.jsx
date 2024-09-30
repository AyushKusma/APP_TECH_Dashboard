import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FormAutoComplete } from "../../components/form/FormAutoComplete";
import { FormProvider } from "../../components/form/FormProvider";
import { FormSwitchButton } from "../../components/form/FormSwitchButton";
import { FormTextField } from "../../components/form/FormTextField";
import { FormUploadImage } from "../../components/form/FormUploadImage";
import { addBlogs, editBlogs } from "../../redux/slices/BlogsSlice";
import { imageApiUrl } from "../../utils/apiConfig";
import slugGenerator from "../../utils/slugGenerator";
import { FormTextAreaField } from "../../components/form/FormTextAreaField";

export const AddBlogs = ({
  toggleOpen,
  cat_id,
  isEdit,
  editData,
  isView = false,
}) => {
  const dispatch = useDispatch();

  const { category } = useSelector((state) => state.category);

  const subBlogs = category.filter((item) => item.category_id === cat_id);

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

  const { blogsLoading } = useSelector((state) => state.blogs);

  const Schema = Yup.object().shape({
    name: Yup.string().required("Blogs Name is required"),
    slug: Yup.string().required("Slug is required"),
    category_id: Yup.object().required("Blogs Category is required"),
    description: Yup.string().required("Description is required"),
    summary: Yup.string().required("Summary is required"),
    meta_title: Yup.string().required("Meta Title is required"),
    meta_description: Yup.string().required("Meta Description is requied"),
    meta_keywords: Yup.string().required("Meta Keywords are required"),
  });

  const defaultValues = useMemo(() => ({
    featured: editData?.featured || false,
    name: editData?.name || "",
    slug: editData?.slug || "",
    category_id: editData?.category || "",
    description: editData?.description || "",
    summary: editData?.summary || "",
    meta_title: editData?.meta_title || "",
    meta_keywords: editData?.meta_keywords || "",
    meta_description: editData?.meta_description || "",
    image: editData?.image
      ? `${imageApiUrl}/${editData?.category.slug}/image/${editData?.image}`
      : null,
  }));

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { handleSubmit, setValue, watch } = methods;

  const name = watch("name");

  useEffect(() => {
    setValue("slug", slugGenerator(name || ""));
  }, [name, setValue]);

  const onSubmit = (data) => {
    const formData = new FormData();
    if (data.image === null) {
      toast.error("Please select an image");
      return;
    }
    formData.append("featured", data.featured ? 1 : 0);
    formData.append("name", data.name);
    formData.append("slug", data.slug);
    formData.append("category_id", data.category_id.id);
    formData.append("description", data.description);
    formData.append("summary", data.summary);
    formData.append("meta_title", data.meta_title);
    formData.append("meta_description", data.meta_description);
    formData.append("meta_keywords", data.meta_keywords);
    formData.append("image", data.image[0]);

    {
      isEdit
        ? dispatch(
            editBlogs({
              data: formData,
              slug: editData?.slug,
              toggleOpen: toggleOpen,
            })
          )
        : dispatch(
            addBlogs({
              data: formData,
              toggleOpen: toggleOpen,
            })
          );
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <FormSwitchButton
            name="featured"
            label="Featured"
            disabled={isView}
          />
        </div>
        <div className="flex gap-2">
          <FormTextField
            disabled={isView}
            name="name"
            label="Name"
            type="text"
          />
          <FormTextField
            disabled={isView}
            name="slug"
            label="Slug"
            type="text"
          />
          <FormAutoComplete
            disabled={isView}
            name="category_id"
            label="Blogs Category"
            optionsData={subBlogs}
          />
        </div>
        <FormTextField
          disabled={isView}
          name="summary"
          label="Summary"
          type="text"
          multiline={true}
          rows={3}
        />
        <FormTextAreaField name="description" readOnly={isView} />

        <FormTextField
          disabled={isView}
          name="meta_title"
          label="Meta Title"
          type="text"
        />
        <div className="flex gap-2">
          <FormTextField
            disabled={isView}
            name="meta_keywords"
            label="Meta Keywords"
            type="text"
            multiline={true}
            rows={3}
          />
          <FormTextField
            disabled={isView}
            name="meta_description"
            label="Meta Description"
            type="text"
            multiline={true}
            rows={3}
          />
        </div>
        <div className="flex flex-col w-full">
          <span className="font-bold p-2">Upload Your Image Here *</span>
          <FormUploadImage
            disabled={isView}
            name="image"
            file={file || defaultValues?.image}
            onDrop={onSingleDrop}
            onRemove={handleRemovePhoto}
          />
          <span className="flex justify-center font-bold">
            Your image must be in a ratio of 1.91:1 (1200 x 630) pixels
          </span>
        </div>
      </div>
      {isView === false && (
        <div className="flex justify-end gap-2 mt-5">
          <span
            className="border-2 border-red-500 text-red-500 rounded-lg flex justify-center items-center px-4 shadow-md hover:bg-red-500 hover:text-white transition-all cursor-pointer"
            onClick={toggleOpen}
          >
            Cancel
          </span>
          <button
            type="submit"
            disabled={blogsLoading}
            className={`${
              blogsLoading ? "bg-gray-500" : "bg-primary hover:bg-secondary"
            } flex gap-2 rounded-lg shadow-md p-2 px-4 text-white transition-all `}
          >
            {blogsLoading ? (
              <CircularProgress
                sx={{
                  color: "white",
                }}
                size={24}
              />
            ) : null}
            {isEdit ? "Edit Blogs" : "Add Blogs"}
          </button>
        </div>
      )}
    </FormProvider>
  );
};
