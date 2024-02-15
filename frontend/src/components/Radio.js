// components/RadioQuestion.js
import React from "react";

import { handleAddRadioQuestion } from "../services/formsServices";
function Radio({
  form,
  setForm,
  handleRadioQuestionChange,
  handleRadioSelectionChange,
  handleAddRadioOption,
  handleRadioOptionTextChange,
}) {
  return (
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
      <button onClick={() => handleAddRadioQuestion(form, setForm)}>
        Add Radio Question
      </button>
    </div>
  );
}

export default Radio;
