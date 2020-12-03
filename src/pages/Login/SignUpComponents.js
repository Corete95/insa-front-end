import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import InputComponent from "./InputComponent";
import SignupEnd from "./SignupEnd";
import { BiX } from "react-icons/bi";
import { CY_API } from "../../config";
import "./SignUpComponents.scss";

const SignUp = ({ open, SignUpClose }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [nameKor, setNameKor] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [isAddress, setIsAddress] = useState("");
  const [isZoneCode, setIsZoneCode] = useState();
  const [openPost, setOpenPost] = useState(false);
  const [endModal, setendModal] = useState(false);
  const history = useHistory();

  const isendModalOpen = () => {
    setendModal(true);
  };

  const isendModalClose = () => {
    setendModal(false);
  };

  const moveEndUp = () => {
    isendModalOpen();
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

  const handleId = (e) => {
    setUserId(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleCheckPassword = (e) => {
    setCheckPassword(e.target.value);
  };

  const handleNameKor = (e) => {
    setNameKor(e.target.value);
  };

  const handleNameEn = (e) => {
    setNameEn(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleIdNumber = (e) => {
    if (e.target.value.length === 15) return;
    if (
      e.target.value.length === 6 ||
      (e.target.value.length === 7 && !e.target.value.includes("-"))
    ) {
      setIdNumber(
        e.target.value.substring(0, 6) + "-" + e.target.value.substring(6)
      );
    } else {
      setIdNumber(e.target.value);
    }
  };

  const handleAddress = (e) => {
    setIsAddress(e.target.value);
  };

  const submit = () => {
    const replaced = idNumber.replaceAll("-", "");

    const isValid =
      userId !== "" &&
      password !== "" &&
      nameKor !== "" &&
      nameEn !== "" &&
      idNumber !== "" &&
      isAddress !== "" &&
      isZoneCode !== "";

    if (isValid) {
      axios
        .post(`${CY_API}/employee/signup`, {
          account: userId,
          password: password,
          name_kor: nameKor,
          name_eng: nameEn,
          mobile: phoneNumber,
          rrn: replaced,
          address: isAddress,
          post_num: isZoneCode
        })

        .then((res) => {
          if (res.status === 201) {
            alert("회원가입에 성공했습니다!");
            isendModalOpen();
          }
        })

        .catch((err) => {
          if (err.message.includes("400")) {
            alert("이미 존재하는 아이디입니다");
          }
        });
    } else {
      alert("필수항목을 입력해주세요");
    }
  };

  return (
    <>
      {open ? (
        <div className="signUpModal">
          <div className="iconX">
            <BiX className="Xicon" size="90px" onClick={SignUpClose} />
          </div>
          <div className="textArea">
            <h1>INSA 회원가입</h1>
            <span>아래 항목들은 모두 필수항목입니다.</span>
          </div>
          <section>
            <div className="inputComponent">
              <InputComponent
                title="아이디"
                type="text"
                value={userId}
                handleInput={handleId}
              />
              <div className="inputForm">
                <InputComponent
                  title="비밀번호"
                  type="password"
                  value={password}
                  handleInput={handlePassword}
                />
                <div className="passwordConfirm">
                  <InputComponent
                    title="비밀번호 확인"
                    type="password"
                    value={checkPassword}
                    handleInput={handleCheckPassword}
                  />
                  {checkPassword !== password ? (
                    <div className="validation">
                      <span>* 비밀번호가 일치하지 않습니다</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <InputComponent
                  title="이름(한글)"
                  type="text"
                  value={nameKor}
                  handleInput={handleNameKor}
                />
                <InputComponent
                  title="이름(영문)"
                  type="text"
                  value={nameEn}
                  handleInput={handleNameEn}
                />
                <InputComponent
                  title="휴대폰"
                  type="tel"
                  value={phoneNumber}
                  handleInput={handlePhoneNumber}
                />
                <InputComponent
                  title="주민번호"
                  type="text"
                  value={idNumber}
                  handleInput={handleIdNumber}
                />
              </div>
              <div className="addressZone">
                <p>주소</p>
                <div>
                  <input value={isZoneCode} />
                  <button onClick={showPostcode}>우편번호 찾기</button>
                  {openPost && (
                    <>
                      <DaumPostcode
                        style={postCodeStyle}
                        onComplete={handleComplete}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="address">
                <input
                  className="addressInput"
                  value={isAddress}
                  onChange={handleAddress}
                />
              </div>
            </div>
            <button className="joinBtn" onClick={moveEndUp}>
              회원가입
            </button>
          </section>
        </div>
      ) : null}
      {endModal && (
        <SignupEnd open={endModal} signEndModalClose={isendModalClose} />
      )}
    </>
  );
};

export default SignUp;
