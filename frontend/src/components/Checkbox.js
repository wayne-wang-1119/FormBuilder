// components/CheckboxQuestion.js
import React from "react";

import { handleAddCheckboxQuestion } from "../services/formsServices";

function Checkbox({
  form,
  setForm,
  handleCheckboxQuestionChange,
  handleCheckboxOptionChange,
  handleAddOption,
  handleOptionTextChange,
}) {
  return (
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
      <button onClick={() => handleAddCheckboxQuestion(form, setForm)}>
        Add Checkbox Question
      </button>
    </div>
  );
}

export default Checkbox;
