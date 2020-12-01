import React from "react";

function Modal(props) {
  const { show, closeModal } = props;

  return (
    <>
      <div className={show ? "modal" : "hide"}>
        <button onClick={closeModal}>X</button>
        <h1>INSA 회원가입</h1>
        <p>아래 항목들은 모두 필수항목입니다.</p>
      </div>
    </>
  );
}

export default Modal;
