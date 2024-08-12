import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export const FormDropdownField = ({ name, label, data, disabled }) => {
  const { control } = useFormContext();
  const [value, setValue] = useState("");

  return (
    <div className="flex w-full">
      <Controller
        name={name}
        control={control}
        defaultValue={value}
        render={({ field, fieldState: { error } }) => (
          <TextField
            fullWidth
            size="small"
            label={label}
            select
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled}
            error={!!error}
            helperText={error ? error.message : ""}
            {...field}
          >
            {data.map((item, index) => {
              return (
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </TextField>
        )}
      />
    </div>
  );
};
