import React, { useState } from "react";
import { addCheckbox, addInput, addRadial } from "./services/formsServices";

const App = () => {
  const [form, setForm] = useState({
    input: [{ title: "default title", description: "default description" }],
    checkbox: [{ label: "default label", value: true }],
    radial: [{ name: "default name", rating: 50 }],
    radio: [
      {
        groupName: "defaultGroup",
        options: ["Option 1", "Option 2"],
        selectedOption: "Option 1",
      },
    ],
  });

  const handleSubmit = async () => {
    const url = "http://localhost:5000/forms";
    console.log(form);
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

  // For Inputs
  const handleInputChange = (index, field, value) => {
    const updatedInputs = form.input.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    setForm({ ...form, input: updatedInputs });
  };

  // For Checkbox Labels
  const handleCheckboxLabelChange = (index, value) => {
    const updatedCheckboxes = form.checkbox.map((item, idx) =>
      idx === index ? { ...item, label: value } : item
    );
    setForm({ ...form, checkbox: updatedCheckboxes });
  };

  // For Checkbox Values
  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = form.checkbox.map((item, idx) =>
      idx === index ? { ...item, value: !item.value } : item
    );
    setForm({ ...form, checkbox: updatedCheckboxes });
  };

  // For Radial Names
  const handleRadialNameChange = (index, value) => {
    const updatedRadials = form.radial.map((item, idx) =>
      idx === index ? { ...item, name: value } : item
    );
    setForm({ ...form, radial: updatedRadials });
  };

  // For Radial Ratings
  const handleRadialChange = (index, value) => {
    const updatedRadials = form.radial.map((item, idx) =>
      idx === index ? { ...item, rating: Number(value) } : item
    );
    setForm({ ...form, radial: updatedRadials });
  };

  // Adding new elements
  const handleAddInput = () => {
    setForm({
      ...form,
      input: [...form.input, { title: "", description: "" }],
    });
  };

  const handleAddCheckbox = () => {
    setForm({
      ...form,
      checkbox: [...form.checkbox, { label: "", value: false }],
    });
  };

  const handleAddRadial = () => {
    setForm({ ...form, radial: [...form.radial, { name: "", rating: 0 }] });
  };

  const handleRadioChange = (groupName, selectedOption) => {
    const updatedRadios = form.radio.map((group) =>
      group.groupName === groupName ? { ...group, selectedOption } : group
    );
    setForm({ ...form, radio: updatedRadios });
  };

  // Add Radio Group
  const handleAddRadioGroup = () => {
    const newGroup = {
      groupName: `Group ${form.radio.length + 1}`,
      options: ["Option 1"],
      selectedOption: "Option 1",
    };
    setForm({ ...form, radio: [...form.radio, newGroup] });
  };

  // Add Radio Option
  const handleAddRadioOption = (groupName) => {
    const updatedRadios = form.radio.map((group) =>
      group.groupName === groupName
        ? {
            ...group,
            options: [...group.options, `Option ${group.options.length + 1}`],
          }
        : group
    );
    setForm({ ...form, radio: updatedRadios });
  };

  return (
    <div>
      <h2>Form Builder</h2>
      {/* Inputs */}
      <div>
        <h3>Inputs</h3>
        {form.input.map((input, index) => (
          <div key={index}>
            <input
              placeholder="Title"
              value={input.title}
              onChange={(e) =>
                handleInputChange(index, "title", e.target.value)
              }
            />
            <input
              placeholder="Description"
              value={input.description}
              onChange={(e) =>
                handleInputChange(index, "description", e.target.value)
              }
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
            <input
              type="checkbox"
              checked={checkbox.value}
              onChange={() => handleCheckboxChange(index)}
            />
            <input
              type="text"
              value={checkbox.label}
              onChange={(e) => handleCheckboxLabelChange(index, e.target.value)}
              placeholder="Label"
            />
          </div>
        ))}
        <button onClick={handleAddCheckbox}>Add Checkbox</button>
      </div>

      {/* Radials */}
      <div>
        <h3>Radials</h3>
        {form.radial.map((radial, index) => (
          <div key={index}>
            <input
              type="text"
              value={radial.name}
              onChange={(e) => handleRadialNameChange(index, e.target.value)}
              placeholder="Name"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={radial.rating}
              onChange={(e) => handleRadialChange(index, e.target.value)}
            />
            <span>{radial.rating}</span>
          </div>
        ))}
        <button onClick={handleAddRadial}>Add Radial</button>
      </div>
      {/* Radios */}
      <div>
        <h3>Radio Buttons</h3>
        {form.radio.map((group, index) => (
          <div key={index}>
            <h4>{group.groupName}</h4>
            {group.options.map((option, optionIndex) => (
              <label key={optionIndex}>
                <input
                  type="radio"
                  name={group.groupName}
                  value={option}
                  checked={group.selectedOption === option}
                  onChange={() => handleRadioChange(group.groupName, option)}
                />
                {option}
              </label>
            ))}
            <button onClick={() => handleAddRadioOption(group.groupName)}>
              Add Option
            </button>
          </div>
        ))}
        <button onClick={handleAddRadioGroup}>Add Radio Group</button>
      </div>

      <button onClick={handleSubmit}>Submit Form</button>
    </div>
  );
};

export default App;
