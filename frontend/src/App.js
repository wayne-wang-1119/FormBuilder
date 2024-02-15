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

import Input from "./components/Input";
import Checkbox from "./components/Checkbox";
import Radio from "./components/Radio";

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
  //this is better
  return (
    <div>
      <h2>Form Builder</h2>
      <Input
        form={form}
        setForm={setForm}
        handleInputChange={handleInputChange}
        handleAddInput={handleAddInput}
      />
      <Checkbox
        form={form}
        setForm={setForm}
        handleCheckboxQuestionChange={handleCheckboxQuestionChange}
        handleCheckboxOptionChange={handleCheckboxOptionChange}
        handleAddOption={handleAddOption}
        handleOptionTextChange={handleOptionTextChange}
        handleAddCheckboxQuestion={handleAddCheckboxQuestion}
      />
      <Radio
        form={form}
        setForm={setForm}
        handleRadioQuestionChange={handleRadioQuestionChange}
        handleRadioSelectionChange={handleRadioSelectionChange}
        handleAddRadioOption={handleAddRadioOption}
        handleRadioOptionTextChange={handleRadioOptionTextChange}
        handleAddRadioQuestion={handleAddRadioQuestion}
      />

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
