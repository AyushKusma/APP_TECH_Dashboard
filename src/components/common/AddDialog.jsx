import React from "react";
import {
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  IconButton,
} from "@mui/material";
import { IoClose } from "react-icons/io5";

export const AddDialog = ({ open, toggleOpen, title, children, max }) => {
  return (
    <div>
      <Dialog open={open} fullWidth maxWidth={max}>
        <DialogTitle className="flex justify-between items-center">
          <div className="font-bold">{title}</div>
          <IconButton color="error" onClick={toggleOpen}>
            <IoClose size={24} />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};
