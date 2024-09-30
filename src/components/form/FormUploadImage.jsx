import React from "react";
import { useDropzone } from "react-dropzone";
import { Box } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { Preview } from "../uploadImage/Preview";

export const FormUploadImage = ({
  name,
  width,
  maxSize = 5,
  onDrop,
  file,
  onRemove,
  disabled,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={file}
      render={({ field, fieldState: { error } }) => {
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
          onDrop: (acceptedFiles) => {
            field.onChange(acceptedFiles);
            onDrop && onDrop(acceptedFiles);
          },
          accept: {
            "image/*": [],
          },
          maxSize: maxSize * 1024 * 1024,
        });

        return (
          <div className="flex w-full">
            <div className="flex w-full justify-center " {...getRootProps()}>
              <input {...getInputProps()} disabled={disabled} />

              {file ? (
                <div className={`w-[${width}] flex justify-center rounded`}>
                  <Preview file={file} onClicked={onRemove} />
                </div>
              ) : (
                <Box
                  sx={{
                    borderRadius: 4,
                    backgroundColor: "white",
                    justifyContent: "center",
                  }}
                  className={`flex w-[${width}] h-56 items-center text-center cursor-pointer border-2 shadow-inner`}
                >
                  {isDragActive ? (
                    <p className="p-2">Drop the files here ...</p>
                  ) : (
                    <p className="p-2">
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  )}
                </Box>
              )}
            </div>
          </div>
        );
      }}
    />
  );
};
