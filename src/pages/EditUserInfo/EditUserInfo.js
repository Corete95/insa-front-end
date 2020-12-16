import React, { useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";
import UserInfo from "../../components/Profile/UserInfo";
import { Link } from "react-router-dom";
import { API } from "../../config";
import "./EditUserInfo.scss";

const EditUserInfo = () => {
  const [form, setValues] = useState({
    userId: "",
    password: "",
    newPassword: "",
    checkPassword: "",
    nameKor: "",
    nameEn: "",
    nickname: "",
    idNumber: "",
    phoneNumber: "",
    emergencyNumber: "",
    businessEmail: "",
    personalEmail: "",
    bankAccount: "",
    passport: ""
  });

  const [isAddress, setIsAddress] = useState("");
  const [isZoneCode, setIsZoneCode] = useState();
  const [openPost, setOpenPost] = useState(false);
  const [userProfile, setuserProfile] = useState([]);

  const handleInput = (e) => {
    setValues({
      [e.target.name]: e.target.value
    });
  };

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
    setOpenPost(false);
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

  useEffect(() => {
    fetch(`${API}/employee/profile`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setuserProfile(data);
      });
  }, []);

  console.log(userProfile);
  return (
    <div className="EditUserProfile">
      <h1> 정보수정</h1>
      <form className="forms">
        <UserInfo
          account={userProfile.account}
          name="userId"
          title="아이디"
          type="text"
          value={userProfile.account}
          handleInput={handleInput}
        />

        <UserInfo
          name="password"
          essential="*"
          title="비밀번호"
          type="password"
          placeholder="정보 변경시 입력"
          value={form.password}
          handleInput={handleInput}
        />

        <UserInfo
          name="newPassword"
          essential="*"
          title="새 비밀번호"
          type="password"
          value={form.newPassword}
          handleInput={handleInput}
        />

        <UserInfo
          name="checkPassword"
          essential="*"
          title="새 비밀번호 확인"
          type="password"
          value={form.checkPassword}
          handleInput={handleInput}
        />
        <UserInfo
          name_kor={userProfile.name_kor}
          name="nameKor"
          essential="*"
          title="이름 (한글)"
          type="text"
          value={userProfile.name_kor}
          handleInput={handleInput}
        />

        <UserInfo
          name_eng={userProfile.name_eng}
          name="nameEn"
          essential="*"
          title="이름 (영문)"
          type="text"
          value={userProfile.name_eng}
          handleInput={handleInput}
        />

        <UserInfo
          name="nickname"
          essential="*"
          title="닉네임"
          type="text"
          value={form.nickname}
          handleInput={handleInput}
        />

        <UserInfo
          name="idNumber"
          title="주민번호"
          type="number"
          value={userProfile.rrn}
          handleInput={handleInput}
        />

        <UserInfo
          name="phoneNumber"
          essential="*"
          title="핸드폰 번호"
          type="tel"
          value={form.phoneNumber}
          handleInput={handleInput}
        />

        <UserInfo
          name="emergencyNumber"
          essential="*"
          title="비상 연락처"
          type="tel"
          value={form.emergencyNumber}
          handleInput={handleInput}
        />

        <UserInfo
          name="businessEmail"
          essential="*"
          title="회사 이메일"
          type="email"
          value={form.businessEmail}
          handleInput={handleInput}
        />
        <UserInfo
          name="personalEmail"
          essential="*"
          title="개인 이메일"
          type="email"
          value={form.personalEmail}
          handleInput={handleInput}
        />
        <UserInfo
          name="bankAccount"
          essential="*"
          title="급여 계좌번호"
          type="number"
          value={form.bankAccount}
          handleInput={handleInput}
        />
        <UserInfo
          name="passport"
          essential="*"
          title="여권번호"
          type="text"
          value={form.passport}
          handleInput={handleInput}
        />
      </form>
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
      <div className="addressArea">
        <input className="addressField"></input>
      </div>
      <div className="editBtnArea">
        <Link to="/Main" className="backBtn">
          뒤로
        </Link>
        <Link className="editBtn">수정</Link>
      </div>
    </div>
  );
};

export default EditUserInfo;
