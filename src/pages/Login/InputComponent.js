import React from "react";
import "./InputComponent.scss";

const InputComponent = ({ title, type, placeholder, value, handleInput }) => {
  return (
    <div className="signUpInput">
      <div className="inputArea">
        <p>{title}</p>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleInput}
        />
      </div>
    </div>
  );
};

export default InputComponent;
