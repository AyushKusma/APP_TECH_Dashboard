import React, { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill";

export const FormTextAreaField = ({ name, placeholder, label }) => {
  const { control } = useFormContext();
  const quillRef = useRef(null);
  return (
    <div>
      <span className="font-bold p-1">{label}</span>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <ReactQuill
            placeholder={placeholder}
            ref={quillRef}
            theme="snow"
            onChange={(content, delta, source, editor) => {
              field.onChange(editor.getHTML());
            }}
            onBlur={(range, source, editor) => {
              field.onBlur(editor.getHTML());
            }}
            helperText={error ? error.message : null}
            {...field}
          />
        )}
      />
    </div>
  );
};
