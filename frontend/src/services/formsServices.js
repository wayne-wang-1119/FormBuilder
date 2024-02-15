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

export const submitForm = async (form, setFormId, setForm) => {
  const url = "http://localhost:5000/forms";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      const { response: backendResponse, form_id } = await response.json();
      setFormId(form_id);
      console.log(form_id);
      console.log("Form submitted successfully:", backendResponse);
      processFormUpdate(form, backendResponse, setForm);
    } else {
      console.error("Form submission failed with status:", response.status);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

export const processFormUpdate = (form, backendResponse, setForm) => {
  const updatedForm = {
    ...form,
  };
  setForm(updatedForm);
};

// export const handleInputChange = (form, index, field, value, setForm) => {
//   const updatedInputs = form.input.map((item, idx) =>
//     idx === index ? { ...item, [field]: value } : item
//   );
//   setForm({ ...form, input: updatedInputs });
// };

// export const handleAddInput = (form, setForm) => {
//   setForm({
//     ...form,
//     input: [...form.input, { title: "", description: "" }],
//   });
// };

// export const handleInputChange = (form, setForm, index, field, value) => {
//   const updatedInputs = form.input.map((item, idx) =>
//     idx === index ? { ...item, [field]: value } : item
//   );
//   setForm({ ...form, input: updatedInputs });
// };

// // Adding new elements
// export const handleAddInput = (form, setForm) => {
//   setForm({
//     ...form,
//     input: [...form.input, { title: "", description: "" }],
//   });
// };

export const handleCheckboxQuestionChange = (form, setForm, index, value) => {
  const updatedCheckbox = [...form.checkbox];
  updatedCheckbox[index].question = value;
  setForm({ ...form, checkbox: updatedCheckbox });
};

// Handle selection changes for checkbox options
export const handleCheckboxOptionChange = (form, setForm, qIndex, option) => {
  const updatedCheckbox = [...form.checkbox];
  const selectedOptions = updatedCheckbox[qIndex].selectedOptions;
  if (selectedOptions.includes(option)) {
    updatedCheckbox[qIndex].selectedOptions = selectedOptions.filter(
      (opt) => opt !== option
    );
  } else {
    updatedCheckbox[qIndex].selectedOptions.push(option);
  }
  setForm({ ...form, checkbox: updatedCheckbox });
};

// Handle text changes for each option
export const handleOptionTextChange = (
  form,
  qIndex,
  oIndex,
  value,
  setForm
) => {
  const updatedCheckbox = [...form.checkbox];
  updatedCheckbox[qIndex].options[oIndex] = value;
  setForm({ ...form, checkbox: updatedCheckbox });
};

// Add a new option to a checkbox question
export const handleAddOption = (form, qIndex, setForm) => {
  const updatedCheckbox = [...form.checkbox];
  updatedCheckbox[qIndex].options.push("");
  updatedCheckbox[qIndex].selectedOptions.push(""); // Optionally, adjust as needed
  setForm({ ...form, checkbox: updatedCheckbox });
};

// Add a new checkbox question
export const handleAddCheckboxQuestion = (form, setForm) => {
  setForm({
    ...form,
    checkbox: [
      ...form.checkbox,
      { question: "", options: [""], selectedOptions: [""] },
    ],
  });
};

// Handle changes to the radio question text
export const handleRadioQuestionChange = (form, index, value, setForm) => {
  const updatedRadio = [...form.radio];
  updatedRadio[index].question = value;
  setForm({ ...form, radio: updatedRadio });
};

// Handle selection change for radio options
export const handleRadioSelectionChange = (form, qIndex, option, setForm) => {
  const updatedRadio = [...form.radio];
  updatedRadio[qIndex].selectedOption = option;
  setForm({ ...form, radio: updatedRadio });
};

// Handle text changes for each radio option
export const handleRadioOptionTextChange = (
  form,
  qIndex,
  oIndex,
  value,
  setForm
) => {
  const updatedRadio = [...form.radio];
  updatedRadio[qIndex].options[oIndex] = value;
  setForm({ ...form, radio: updatedRadio });
};

// Add a new option to a radio question
export const handleAddRadioOption = (form, qIndex, setForm) => {
  const updatedRadio = [...form.radio];
  updatedRadio[qIndex].options.push("");
  setForm({ ...form, radio: updatedRadio });
};

// Add a new radio question
export const handleAddRadioQuestion = (form, setForm) => {
  setForm({
    ...form,
    radio: [...form.radio, { question: "", options: [""], selectedOption: "" }],
  });
};

export const handleInputChange = (form, index, field, value, setForm) => {
  const updatedInputs = form.input.map((item, idx) =>
    idx === index ? { ...item, [field]: value } : item
  );
  setForm({ ...form, input: updatedInputs });
};

export const handleAddInput = (form, setForm) => {
  setForm({
    ...form,
    input: [...form.input, { title: "", description: "" }],
  });
};
