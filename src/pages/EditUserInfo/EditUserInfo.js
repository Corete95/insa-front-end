import React from "react";
import Postcode from "./Postcode";
import "./EditUserInfo.scss";

const EditUserInfo = () => {
  return (
    <div className="EditUserProfile">
      <h1> 정보수정</h1>
      <div className="userAddress">
        <p> 주소 </p>
        <input className="addressInput" />
        <button onClick={Postcode}>우편번호 찾기</button>
      </div>
    </div>
  );
};

export default EditUserInfo;
