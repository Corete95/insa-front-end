import React, { useState } from "react";
import Modal from "../../components/SignUpComponents/SignUpComponents";
import "./SignUp.scss";

function SignUp() {
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <div className="SignUp">
      <h1>모달 확인창</h1>
      {!show && <button onClick={openModal}>Show modal</button>}
      <Modal closeModal={closeModal} show={show} />
    </div>
  );
}

export default SignUp;
