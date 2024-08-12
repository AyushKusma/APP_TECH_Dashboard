import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import React from "react";
import { IoClose } from "react-icons/io5";
export const DeleteDialog = ({ open, title, toggleOpen, children, width }) => {
  return (
    <div>
      <Dialog open={open} maxWidth={width}>
        <DialogTitle className="flex justify-between items-center">
          <div className="font-bold">{title}</div>
          <IconButton onClick={toggleOpen} color="error">
            <IoClose size={24} />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};
