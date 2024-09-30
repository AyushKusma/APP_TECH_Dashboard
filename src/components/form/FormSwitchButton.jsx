import { FormControlLabel, Switch } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const FormSwitchButton = ({ name, label, disabled }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormControlLabel
            control={
              <Switch
                checked={field.value}
                defaultValue={false}
                {...field}
                disabled={disabled}
              />
            }
            label={label}
          />
        );
      }}
    />
  );
};
