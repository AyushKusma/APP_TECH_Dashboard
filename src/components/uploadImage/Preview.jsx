import { Box } from "@mui/material";
import React from "react";
import { IoClose } from "react-icons/io5";

export const Preview = ({ file }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
        className="border-2 items-center relative rounded-md"
        key={file.key}
      >
        <img
          src={typeof file === "string" ? file : file.preview}
          alt="Uploaded Image"
          className="object-contain w-full h-full rounded-md"
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </Box>
    </>
  );
};
