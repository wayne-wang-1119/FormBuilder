import React, { useState, ChangeEvent } from "react";
import { Input, CheckBoxItem, Radial, FormState } from "./model/model";
import { addCheckbox, addInput, addRadial } from "./services/formsServices";

const App = () => {
  const [form, setForm] = useState<FormState>({
    input: [{ title: "default title", description: "default description" }],
    checkbox: [{ label: "default label", value: true }],
    radial: [{ name: "default name", rating: 50 }],
  });

  const handleSubmit = async () => {
    const url = "http://localhost:5000/api/form";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Form submitted successfully:", jsonResponse);
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleAddInput = () => {
    const newInput: Input = { title: "", description: "" };
    setForm((currentForm) => addInput(currentForm, newInput));
  };

  const handleAddCheckbox = () => {
    const newCheckbox: CheckBoxItem = { label: "", value: false };
    setForm((currentForm) => addCheckbox(currentForm, newCheckbox));
  };

  const handleAddRadial = () => {
    const newRadial: Radial = { name: "", rating: 0 };
    setForm((currentForm) => addRadial(currentForm, newRadial));
  };

  return (
    <div>
      <h2>Form Builder</h2>
      {/* Inputs */}
      <div>
        <h3>Inputs</h3>
        {form.input.map((input, index) => (
          <div key={index}>
            <input placeholder="Title" value={input.title} readOnly />
            <input
              placeholder="Description"
              value={input.description}
              readOnly
            />
          </div>
        ))}
        <button onClick={handleAddInput}>Add Input</button>
      </div>

      {/* Checkboxes */}
      <div>
        <h3>Checkboxes</h3>
        {form.checkbox.map((checkbox, index) => (
          <div key={index}>
            <input type="checkbox" checked={checkbox.value} readOnly />
            <label>{checkbox.label}</label>
          </div>
        ))}
        <button onClick={handleAddCheckbox}>Add Checkbox</button>
      </div>

      {/* Radials */}
      <div>
        <h3>Radials</h3>
        {form.radial.map((radial, index) => (
          <div key={index}>
            <label>
              {radial.name}
              <input
                type="range"
                min="0"
                max="100"
                value={radial.rating}
                readOnly
              />
            </label>
          </div>
        ))}
        <button onClick={handleAddRadial}>Add Radial</button>
      </div>

      <button onClick={handleSubmit}>Submit Form</button>
    </div>
  );
};

export default App;
