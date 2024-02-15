import React, { useState } from "react";
import { addCheckbox, addInput, addRadial } from "./services/formsServices";

const App = () => {
  const [responses, setResponses] = useState({});
  const [form, setForm] = useState({
    input: [
      {
        title: "what is the theme of this book?",
        description: "describe the theme of the book",
      },
      {
        title: "what is a good work mentality?",
        description: "describe the good work example/story in the book",
      },
    ],
    checkbox: [
      {
        question: "Which of these themes are present in the book?",
        options: ["Adventure", "Romance", "Mystery"],
        selectedOptions: ["Adventure"],
      },
    ],

    radio: [
      {
        question: "Which city is best for the setting of the story?",
        options: ["New York", "Paris", "Tokyo"],
        selectedOption: "New York",
      },
    ],
  });

  // const handleSubmit = async () => {
  //   const url = "http://localhost:5000/forms";
  //   console.log(form);
  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(form),
  //     });
  //     if (response.ok) {
  //       const jsonResponse = await response.json();
  //       console.log("Form submitted successfully:", jsonResponse);
  //       setResponses(jsonResponse.response || {});
  //     } else {
  //       console.error("Form submission failed");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };

  const handleSubmit = async () => {
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
        console.log("Form submitted successfully:", backendResponse);

        // Process and update the form state based on the backendResponse
        const updatedForm = {
          ...form,
          // Process "input" questions
          input: form.input.map((input) => {
            const backendInputResponse = backendResponse.input[input.title];
            // Directly use the backend response to update the input description if necessary
            return backendInputResponse
              ? {
                  ...input,
                  description:
                    backendInputResponse.response || input.description,
                }
              : input;
          }),
          // Process "checkbox" questions
          checkbox: form.checkbox.map((checkbox) => {
            const backendCheckbox = backendResponse.checkbox.find(
              (cb) => cb.question === checkbox.question
            );
            const updatedOptions = backendCheckbox
              ? backendCheckbox.options
              : checkbox.options;
            const updatedSelectedOptions = backendCheckbox
              ? [backendCheckbox.selectedOptions]
              : checkbox.selectedOptions;
            return {
              ...checkbox,
              options: updatedOptions,
              selectedOptions: updatedSelectedOptions,
            };
          }),
          // Process "radio" questions
          radio: form.radio.map((radio) => {
            const backendRadio = backendResponse.radio.find(
              (r) => r.question === radio.question
            );
            const updatedOptions = backendRadio
              ? backendRadio.options
              : radio.options;
            return {
              ...radio,
              options: updatedOptions,
              selectedOption: backendRadio
                ? backendRadio.selectedOption
                : radio.selectedOption,
            };
          }),
        };

        setForm(updatedForm);
      } else {
        console.error("Form submission failed with status:", response.status);
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

  const handleCheckboxQuestionChange = (index, value) => {
    const updatedCheckbox = [...form.checkbox];
    updatedCheckbox[index].question = value;
    setForm({ ...form, checkbox: updatedCheckbox });
  };

  // Handle selection changes for checkbox options
  const handleCheckboxOptionChange = (qIndex, option) => {
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
  const handleOptionTextChange = (qIndex, oIndex, value) => {
    const updatedCheckbox = [...form.checkbox];
    updatedCheckbox[qIndex].options[oIndex] = value;
    setForm({ ...form, checkbox: updatedCheckbox });
  };

  // Add a new option to a checkbox question
  const handleAddOption = (qIndex) => {
    const updatedCheckbox = [...form.checkbox];
    updatedCheckbox[qIndex].options.push("");
    updatedCheckbox[qIndex].selectedOptions.push(""); // Optionally, adjust as needed
    setForm({ ...form, checkbox: updatedCheckbox });
  };

  // Add a new checkbox question
  const handleAddCheckboxQuestion = () => {
    setForm({
      ...form,
      checkbox: [
        ...form.checkbox,
        { question: "", options: [""], selectedOptions: [""] },
      ],
    });
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

  // Handle changes to the radio question text
  const handleRadioQuestionChange = (index, value) => {
    const updatedRadio = [...form.radio];
    updatedRadio[index].question = value;
    setForm({ ...form, radio: updatedRadio });
  };

  // Handle selection change for radio options
  const handleRadioSelectionChange = (qIndex, option) => {
    const updatedRadio = [...form.radio];
    updatedRadio[qIndex].selectedOption = option;
    setForm({ ...form, radio: updatedRadio });
  };

  // Handle text changes for each radio option
  const handleRadioOptionTextChange = (qIndex, oIndex, value) => {
    const updatedRadio = [...form.radio];
    updatedRadio[qIndex].options[oIndex] = value;
    setForm({ ...form, radio: updatedRadio });
  };

  // Add a new option to a radio question
  const handleAddRadioOption = (qIndex) => {
    const updatedRadio = [...form.radio];
    updatedRadio[qIndex].options.push("");
    setForm({ ...form, radio: updatedRadio });
  };

  // Add a new radio question
  const handleAddRadioQuestion = () => {
    setForm({
      ...form,
      radio: [
        ...form.radio,
        { question: "", options: [""], selectedOption: "" },
      ],
    });
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

      <div>
        <h3>Checkbox Questions</h3>
        {form.checkbox.map((checkboxQuestion, qIndex) => (
          <div key={qIndex}>
            <input
              type="text"
              value={checkboxQuestion.question}
              onChange={(e) =>
                handleCheckboxQuestionChange(qIndex, e.target.value)
              }
              placeholder="Question"
            />
            {checkboxQuestion.options.map((option, oIndex) => (
              <div key={oIndex}>
                <input
                  type="checkbox"
                  checked={checkboxQuestion.selectedOptions.includes(option)}
                  onChange={() => handleCheckboxOptionChange(qIndex, option)}
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) =>
                    handleOptionTextChange(qIndex, oIndex, e.target.value)
                  }
                  placeholder="Option"
                />
              </div>
            ))}
            <button onClick={() => handleAddOption(qIndex)}>Add Option</button>
          </div>
        ))}
        <button onClick={handleAddCheckboxQuestion}>
          Add Checkbox Question
        </button>
      </div>
      {/* Radios */}
      <div>
        <h3>Radio Questions</h3>
        {form.radio.map((radioQuestion, qIndex) => (
          <div key={qIndex}>
            <input
              type="text"
              value={radioQuestion.question}
              onChange={(e) =>
                handleRadioQuestionChange(qIndex, e.target.value)
              }
              placeholder="Question"
            />
            {radioQuestion.options.map((option, oIndex) => (
              <label key={oIndex}>
                <input
                  type="radio"
                  name={radioQuestion.question}
                  value={option}
                  checked={radioQuestion.selectedOption === option}
                  onChange={() => handleRadioSelectionChange(qIndex, option)}
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) =>
                    handleRadioOptionTextChange(qIndex, oIndex, e.target.value)
                  }
                  placeholder="Option"
                />
              </label>
            ))}
            <button onClick={() => handleAddRadioOption(qIndex)}>
              Add Option
            </button>
          </div>
        ))}
        <button onClick={handleAddRadioQuestion}>Add Radio Question</button>
      </div>

      <button onClick={handleSubmit}>Submit Form</button>
      <div>
        <h2>Responses</h2>
        {Object.entries(responses).map(([question, answer], index) => (
          <div key={index}>
            <h4>{question}</h4>
            <p>{answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
