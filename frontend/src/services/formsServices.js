import React, { useState } from "react";
import { Input, Radial, CheckBoxItem, FormState } from "../model/model";

export const addInput = (form, newInput) => {
  return {
    ...form,
    input: [...form.input, newInput],
  };
};

export const addCheckbox = (form, newCheckbox) => {
  return {
    ...form,
    checkbox: [...form.checkbox, newCheckbox],
  };
};

export const addRadial = (form, newRadial) => {
  return {
    ...form,
    radial: [...form.radial, newRadial],
  };
};
