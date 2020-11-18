import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../config";
import "./Login.scss";

function Login(props) {
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const isLogin = () => {
    fetch(`${API}/?/?`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (checked === true) {
          localStorage.setItem("token", res.AUTHORIZATION);
          props.history.push("/Main");
          alert("로그인 유지!");
        } else {
          window.sessionStorage.setItem("token", res.AUTHORIZATION);
          props.history.push("/Main");
          alert("로그인 유지 아님!!");
        }
      });
  };

  return (
    <>
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
                valuetype="text"
              ></input>
            </label>
            <label className="labelInput" title="아이디">
              <input
                value={password}
                onChange={handlePassword}
                placeholder="비밀번호"
                valuestype="password"
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
              <span className="questionText">INSA 임직원 이신가요?</span>
              <div>
                <span>임직원 인증</span>
                <i className="xi-angle-right-min"></i>
              </div>
            </div>
          </div>
          <div className="boxRight">
            <div className="recruitBox">
              <span>Recruit</span>
              <img alt="recruitImg" src="./images/Recruit.svg"></img>
            </div>
            <div className="introductionBox">
              <span>회사소개</span>
              <img alt="introduction" src="./images/INSA.svg"></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
