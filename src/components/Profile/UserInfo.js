import React from "react";
import "./UserInfo.scss";

const UserInfo = ({ title, type }) => {
  return (
    <div className="userInfo">
      <p>{title}</p>
      <input type={type} />
    </div>
  );
};

export default UserInfo;
