import React, { useState, useEffect } from "react";
import Postcode from "./Postcode";
import UserInfo from "../../components/Profile/UserInfo";
import "./EditUserInfo.scss";

const EditUserInfo = () => {
  const [user_data, setUserData] = useState([]);
  useEffect(() => {
    fetch("../../components/Profile/Userdata.js")
      .then((res) => res.json())
      .then((res) => {
        setUserData(res.user_data);
      });
  }, []);

  return (
    <div className="EditUserProfile">
      <h1> 정보수정</h1>
      {user_data.map((user_data) => {
        return (
          <UserInfo
            key={user_data.id}
            necessary={user_data.necessary}
            title={user_data.title}
            type={user_data.text}
          />
        );
      })}
      <div className="userAddress">
        <p> 주소 </p>
        <input className="addressInput" />
        <button onClick={Postcode}>우편번호 찾기</button>
      </div>
      <button>뒤로</button>
      <button className="editBtn">수정</button>
    </div>
  );
};

export default EditUserInfo;
