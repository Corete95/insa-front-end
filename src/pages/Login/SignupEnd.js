import React from "react";
import "./SignupEnd.scss";

const SignupEnd = ({ open, signEndModalClose }) => {
  return (
    <>
      {open ? (
        <div className="signupEnd">
          <div className="Xicon">
            <i class="xi-close" onClick={signEndModalClose}></i>
          </div>
          <div className="textCenter">
            <div className="textDiv">
              <span>
                INSA 회원가입이 완료되었습니다. :
                <br />
                <span>창을 닫고 로그인을 진행해주세요.</span>
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SignupEnd;
