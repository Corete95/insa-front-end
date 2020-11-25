import React from "react";
import "./UserInfo.scss";

const UserInfo = ({ title, type }) => {
  return (
    <div className="userInfo">
      <div className="userInputArea">
        <p>{title}</p>
        <input type={type} />
      </div>
    </div>
  );
};

export default UserInfo;
