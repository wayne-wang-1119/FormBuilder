import React, { useState } from "react";
import {
  addCheckbox,
  addInput,
  addRadial,
  submitForm,
  handleInputChange,
  handleAddInput,
  handleCheckboxQuestionChange,
  handleCheckboxOptionChange,
  handleAddOption,
  handleAddCheckboxQuestion,
  handleOptionTextChange,
  handleAddRadioQuestion,
  handleRadioQuestionChange,
  handleRadioSelectionChange,
  handleAddRadioOption,
  handleRadioOptionTextChange,
} from "./services/formsServices";
import ReportGenerator from "./ReportGenerator";

const App = () => {
  const [responses, setResponses] = useState({});
  const [formId, setFormId] = useState("");
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
        options: ["Business", "Knowledge", "Romance"],
        selectedOptions: ["Romance"],
      },
    ],

    radio: [
      {
        question: "Which city is best for the setting of the story?",
        options: ["New York", "Paris", "Tokyo", "Mars"],
        selectedOption: "Mars",
      },
    ],
  });

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
                handleInputChange(form, index, "title", e.target.value, setForm)
              }
            />
            <input
              placeholder="Description"
              value={input.description}
              onChange={(e) =>
                handleInputChange(
                  form,
                  index,
                  "description",
                  e.target.value,
                  setForm
                )
              }
            />
          </div>
        ))}
        <button onClick={handleAddInput(form, setForm)}>Add Input</button>
      </div>

      <div>
        <h3>Checkbox Questions</h3>
        {form.checkbox.map((checkboxQuestion, qIndex) => (
          <div key={qIndex}>
            <input
              type="text"
              value={checkboxQuestion.question}
              onChange={(e) =>
                handleCheckboxQuestionChange(
                  form,
                  setForm,
                  qIndex,
                  e.target.value
                )
              }
              placeholder="Question"
            />
            {checkboxQuestion.options.map((option, oIndex) => (
              <div key={oIndex}>
                <input
                  type="checkbox"
                  checked={checkboxQuestion.selectedOptions.includes(option)}
                  onChange={() =>
                    handleCheckboxOptionChange(form, setForm, qIndex, option)
                  }
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) =>
                    handleOptionTextChange(
                      form,
                      qIndex,
                      oIndex,
                      e.target.value,
                      setForm
                    )
                  }
                  placeholder="Option"
                />
              </div>
            ))}
            <button onClick={() => handleAddOption(form, qIndex, setForm)}>
              Add Option
            </button>
          </div>
        ))}
        <button onClick={handleAddCheckboxQuestion(form, setForm)}>
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
                handleRadioQuestionChange(form, qIndex, e.target.value, setForm)
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
                  onChange={() =>
                    handleRadioSelectionChange(form, qIndex, option, setForm)
                  }
                />
                {option}
                <input
                  type="text"
                  value={option}
                  onChange={(e) =>
                    handleRadioOptionTextChange(
                      form,
                      qIndex,
                      oIndex,
                      e.target.value,
                      setForm
                    )
                  }
                  placeholder="Option"
                />
              </label>
            ))}
            <button onClick={() => handleAddRadioOption(form, qIndex, setForm)}>
              Add Option
            </button>
          </div>
        ))}
        <button onClick={handleAddRadioQuestion(form, setForm)}>
          Add Radio Question
        </button>
      </div>

      <button onClick={() => submitForm(form, setFormId, setForm)}>
        Submit Form
      </button>

      <div>
        <h2>Responses</h2>
      </div>
      <div>
        {formId && (
          <a
            href={`http://localhost:5000/download-pdf/${formId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Download PDF</button>
          </a>
        )}
      </div>
    </div>
  );
};

export default App;
