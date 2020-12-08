import React, { useState } from "react";
import "./Privacy.scss";
import SignUpComponents from "./SignUpComponents";

const Privacy = ({ open, close }) => {
  const [signupModal, setsignupModal] = useState(false);

  const isSignupModalOpen = () => {
    setsignupModal(true);
  };

  const isSignupModalClose = () => {
    setsignupModal(false);
  };

  const moveSignUp = () => {
    close();
    isSignupModalOpen();
  };

  return (
    <>
      {open ? (
        <div className="privacy">
          <div className="Xicon">
            <i class="xi-close" onClick={close}></i>
          </div>
          <div className="privacyCenter">
            <div className="INSAsignup">
              <span>INSA 회원가입</span>
            </div>
            <div className="privacyText">
              <span>개인정보 동의</span>
            </div>
            <div className="explanationBox">
              <div>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet.
                <br />
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no
              </div>
            </div>
            <div className="buttonBox">
              <span onClick={moveSignUp}>
                개인정보 수집 및 이용에 동의합니다. <i class="xi-check"></i>
              </span>
            </div>
          </div>
        </div>
      ) : null}
      {signupModal && (
        <SignUpComponents open={signupModal} SignUpClose={isSignupModalClose} />
      )}
    </>
  );
};

export default Privacy;
