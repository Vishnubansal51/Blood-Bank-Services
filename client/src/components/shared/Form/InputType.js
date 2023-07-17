import React from "react";

const InputType = ({labelFor,labelText,inputType, value, onChange, name}) => {
  return (
    <>
      <div className="mb-1">
        <label htmlFor="labelFor" className="form-label">
          {labelText}
        </label>
        <input
          type={inputType}
          className="form-control"
          name={name}
          value= {value}
          onChange={onChange}
        />
        {/* <div id="emailHelp" className="form-text">
          We'll never share your {names}with anyone else.
        </div> */}
      </div>
    </>
  );
};

export default InputType;
