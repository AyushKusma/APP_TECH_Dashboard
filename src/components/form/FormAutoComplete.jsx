import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const FormAutoComplete = ({ name, label, disabled, optionsData }) => {
  const { control } = useFormContext();

  const defaultProps = {
    options: optionsData.map((option) => option),
    getOptionLabel: (opt) => `${opt.name}` || null,
  };

  return (
    <div className="flex w-full">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Autocomplete
            {...defaultProps}
            fullWidth
            value={value || null}
            size="small"
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label={label}
                disabled={disabled}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
        )}
        rules={{ required: `${optionsData.name} is required` }}
      />
    </div>
  );
};
