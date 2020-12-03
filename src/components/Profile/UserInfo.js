import React from "react";
import "./UserInfo.scss";

const UserInfo = ({
  title,
  type,
  essential,
  placeholder,
  handleInput,
  name
}) => {
  return (
    <div className="userInfo">
      <div className="userInputArea">
        <div className="inputLabel">
          <span>{essential}</span>
          <p>{title}</p>
        </div>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={handleInput}
        />
      </div>
    </div>
  );
};

export default UserInfo;
