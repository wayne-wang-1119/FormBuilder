import React, { useState } from "react";
import { Input, Radial, CheckBoxItem, FormState } from "../model/model";

export const addInput = (form: FormState, newInput: Input): FormState => {
  return {
    ...form,
    input: [...form.input, newInput],
  };
};

export const addCheckbox = (
  form: FormState,
  newCheckbox: CheckBoxItem
): FormState => {
  return {
    ...form,
    checkbox: [...form.checkbox, newCheckbox],
  };
};

export const addRadial = (form: FormState, newRadial: Radial): FormState => {
  return {
    ...form,
    radial: [...form.radial, newRadial],
  };
};
