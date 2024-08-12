import React from "react";
import { FormProvider as Form } from "react-hook-form";

export const FormProvider = ({ children, onSubmit, methods }) => {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
};
