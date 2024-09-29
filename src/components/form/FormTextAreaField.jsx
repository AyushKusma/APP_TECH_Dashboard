import React, { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const FormTextAreaField = ({ name, placeholder, label }) => {
  const { control } = useFormContext();
  const quillRef = useRef(null);

  return (
    <div>
      <label className="font-bold p-1">{label}</label>
      <div id="toolbar">
        <select class="ql-header">
          <option value="1"></option>
          <option value="2"></option>
          <option selected></option>
        </select>
        <select class="ql-size">
          <option value="small"></option>
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
        <select class="ql-align"></select>

        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>

        <button class="ql-blockquote"></button>

        <button class="ql-link"></button>
        <button class="ql-image"></button>

        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
        <button class="ql-list" value="check"></button>

        <button class="ql-indent" value="-1"></button>
        <button class="ql-indent" value="+1"></button>

        <select class="ql-color"></select>
        <select class="ql-background"></select>
      </div>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <ReactQuill
              className=""
              placeholder={placeholder}
              ref={quillRef}
              theme="snow"
              modules={{
                toolbar: "#toolbar",
              }}
              onChange={(content, delta, source, editor) => {
                field.onChange(editor.getHTML());
              }}
              onBlur={(range, source, editor) => {
                field.onBlur(editor.getHTML());
              }}
              {...field}
            />
            {error && <p className="text-red-500">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};
