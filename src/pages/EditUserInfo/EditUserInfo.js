import React, { useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";
import UserInfo from "../../components/Profile/UserInfo";
import "./EditUserInfo.scss";

const EditUserInfo = () => {
  const [user_data, setUserData] = useState([]);
  useEffect(() => {
    fetch("/Data/Userdata.json")
      .then((res) => res.json())
      .then((res) => {
        setUserData(res.user_data);
      });
  }, []);

  const [isAddress, setIsAddress] = useState("");
  const [isZoneCode, setIsZoneCode] = useState();
  const [isPostOpen, setIsPostOpen] = useState(true);
  const [openPost, setOpenPost] = useState(false);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setIsZoneCode(data.zonecode);
    setIsAddress(fullAddress);
    setIsPostOpen(false);
  };
  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "50%",
    width: "400px",
    height: "500px",
    padding: "7px"
  };

  const showPostcode = () => {
    setOpenPost(!openPost);
  };

  return (
    <div className="EditUserProfile">
      <h1> 정보수정</h1>
      {user_data.map((user_data) => {
        return (
          <UserInfo
            key={user_data.id}
            title={user_data.title}
            type={user_data.text}
          />
        );
      })}
      <div className="userAddress">
        <p> 주소 </p>
        <div className="searchPostArea">
          <input className="addressInput" />
          <button onClick={showPostcode}>우편번호 찾기</button>
          {openPost && (
            <>
              <DaumPostcode style={postCodeStyle} onComplete={handleComplete} />
            </>
          )}
        </div>
      </div>
      <input className="addressField"></input>
      <div className="editBtnArea">
        <button>뒤로</button>
        <button className="editBtn">수정</button>
      </div>
    </div>
  );
};

export default EditUserInfo;
