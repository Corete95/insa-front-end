import React, { useEffect, useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { API } from "../../config";
import "./Login.scss";
import Privacy from "./Privacy";
import Main from "../Main/Main";

function Login(props) {
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [privacyModal, setprivacyModal] = useState(false);

  const isPrivacyModalOpen = () => {
    setprivacyModal(true);
  };
  const isPrivacyModalClose = () => {
    setprivacyModal(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const isLogin = () => {
    fetch(`${API}/employee/signin`, {
      method: "POST",
      body: JSON.stringify({
        account: email,
        password
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (checked === true) {
          localStorage.setItem("token", res.token);
          history.push("/Main");
          alert("로그인 유지!");
        } else {
          window.sessionStorage.setItem("token", res.token);
          history.push("/Main");
          alert("로그인 유지 아님!!");
        }
      });
  };

  return (
    <>
      <Privacy open={privacyModal} close={isPrivacyModalClose} />
      <div className="topMain">
        <div className="topLogo">
          <img alt="insaLogo" src="./images/INSA_LOGO.svg"></img>
        </div>
      </div>
      <div className="centerMain">
        <div className="centerBox">
          <div className="boxLeft">
            <label className="labelInput" title="아이디">
              <input
                value={email}
                onChange={handleEmail}
                placeholder="아이디"
                type="text"
              ></input>
            </label>
            <label className="labelInput" title="아이디">
              <input
                value={password}
                onChange={handlePassword}
                placeholder="비밀번호"
                type="password"
              ></input>
            </label>
            <label className="checkBoxInput">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              <span>로그인 유지</span>
            </label>

            <div className="loginBox">
              <Link onClick={isLogin}>로그인</Link>
            </div>
            <div className="bottomText">
              <div>
                <span onClick={isPrivacyModalOpen}>INSA 회원가입</span>
                <i
                  style={{ cursor: "pointer" }}
                  className="xi-angle-right-min"
                ></i>
              </div>
            </div>
          </div>
          <div className="boxRight">
            <div className="recruitBox">
              <span>Recruit</span>
              <img
                className="arrowImg"
                alt="arrow"
                src="./images/arrow.svg"
              ></img>
              <img
                className="recruitImg"
                alt="recruitImg"
                src="./images/Recruit.svg"
              ></img>
            </div>
            <div className="introductionBox">
              <span>회사소개</span>
              <img
                className="arrowImg"
                alt="arrow"
                src="./images/arrow.svg"
              ></img>
              <img
                className="introductionImg"
                alt="introduction"
                src="./images/INSA.svg"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(Login);
