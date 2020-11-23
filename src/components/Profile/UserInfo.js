import React from "react";
import "./UserInfo.scss";

const UserInfo = () => {
  return (
    <div className="userInfo">
      <p>{user_data.title}</p>
      <input type="{user_data.type}" />
    </div>
  );
};

export default UserInfo;
