import React, { useEffect, useMemo } from "react";
import { FormProvider } from "../../components/form/FormProvider";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormTextField } from "../../components/form/FormTextField";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { editCategory, postCategory } from "../../redux/slices/CategorySlice";
import { FormDropdownField } from "../../components/form/FormDropdownField";
import slugGenerator from "../../utils/slugGenerator";

export const AddCategory = ({ toggleOpen, data, isEdit, editData }) => {
  const dispatch = useDispatch();

  const { categoryLoading, categoryError } = useSelector(
    (state) => state.category
  );

  const Schema = Yup.object().shape({
    name: Yup.string().required("Category Name is required"),
    slug: Yup.string().required("Category Slug is required"),
    meta_title: Yup.string().required("Meta Title is required"),
    meta_description: Yup.string().required("Meta Description is requied"),
    meta_keywords: Yup.string().required("Meta Keywords is required"),
  });

  const defaultValues = useMemo(() => ({
    name: editData?.name || "",
    slug: editData?.slug || "",
    category_id: editData?.category_id || "",
    meta_title: editData?.meta_title || "",
    meta_description: editData?.meta_description || "",
    meta_keywords: editData?.meta_keywords || "",
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

  const onAddSubmit = (data) => {
    dispatch(
      postCategory({
        data: {
          name: data.name,
          slug: data.slug,
          meta_title: data.meta_title,
          category_id: data.category_id,
          meta_description: data.meta_description,
          meta_keywords: data.meta_keywords,
        },
        toggleOpen: toggleOpen,
      })
    );
  };

  const onEditSubmit = (data) => {
    dispatch(
      editCategory({
        data: {
          id: editData.id,
          name: data.name,
          slug: data.slug,
          meta_title: data.meta_title,
          category_id: data.category_id,
          meta_description: data.meta_description,
          meta_keywords: data.meta_keywords,
        },
        toggleOpen: toggleOpen,
      })
    );
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={isEdit ? handleSubmit(onEditSubmit) : handleSubmit(onAddSubmit)}
    >
      <div className="flex flex-col gap-5">
        <FormTextField name="name" label="Name" type="text" />
        <FormTextField name="slug" label="Slug" type="text" />
        <FormDropdownField
          name="category_id"
          label="Select Main Category"
          data={data}
          disabled={false}
        />
        <FormTextField name="meta_title" label="Meta Title" type="text" />
        <FormTextField name="meta_keywords" label="Meta Keywords" type="text" />
        <FormTextField
          name="meta_description"
          label="Meta Description"
          type="text"
          multiline={true}
          maxRows={3}
        />
      </div>
      <div className="flex justify-end gap-2 mt-5">
        <span
          className="border-2 border-red-500 text-red-500 rounded-lg flex justify-center items-center px-4 shadow-md hover:bg-red-500 hover:text-white transition-all cursor-pointer"
          onClick={toggleOpen}
        >
          Cancel
        </span>
        <button
          disabled={categoryLoading}
          className={`${
            categoryLoading ? "bg-gray-500" : "bg-primary hover:bg-secondary"
          } flex gap-2 rounded-lg shadow-md p-2 px-4 text-white transition-all `}
        >
          {categoryLoading ? (
            <CircularProgress
              sx={{
                color: "white",
              }}
              size={24}
            />
          ) : null}
          {isEdit ? "Edit Category" : "Add Category"}
        </button>
      </div>
    </FormProvider>
  );
};
