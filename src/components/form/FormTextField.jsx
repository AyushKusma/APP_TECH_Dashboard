import React, { useState } from "react";
// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import TextField from "@mui/material/TextField";

export const FormTextField = ({
  name,
  label,
  type,
  required,
  disabled,
  defVal,
  multiline = false,
  rows,
}) => {
  const { control } = useFormContext();
  const [value, setValue] = useState("");
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={value || defVal}
      render={({ field, fieldState: { error } }) => (
        <TextField
          value={field.value}
          onChange={(e) => setValue(e.target.value)}
          label={label}
          type={type}
          size="small"
          required={required}
          multiline={multiline}
          rows={rows}
          fullWidth
          disabled={disabled}
          error={!!error}
          helperText={error ? error.message : ""}
          {...field}
        />
      )}
    />
  );
};
