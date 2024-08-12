import { LinearProgress } from "@mui/material";
import React from "react";

export const LoadingScreen = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col h-screen justify-center items-center w-fit">
        <img
          src="images\AppLogo.png"
          alt="App Technologies Logo"
          className="w-56"
        />
        <LinearProgress
          className="w-full mt-2"
          sx={{
            backgroundColor: "", // background color of the progress bar
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#1f8da1", // color of the progress indicator
            },
          }}
        />
      </div>
    </div>
  );
};
