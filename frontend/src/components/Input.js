// components/InputField.js
import React from "react";

import { handleAddInput } from "../services/formsServices";

function Input({ form, setForm, handleInputChange }) {
  return (
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
      <button onClick={() => handleAddInput(form, setForm)}>Add Input</button>
    </div>
  );
}

export default Input;
