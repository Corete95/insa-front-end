import React from "react";
import Nav from "../../components/Nav/Nav";
import Side from "../../components/Side/Side";
import "./Main.scss";

const Main = () => {
  return (
    <>
      {/* <Nav />
      <Side /> */}
      <div>
        <span>Notice</span>
        <ul>
          <li>
            <span>여기는 제목이 옵니다...</span>
            <p>여기는 본문입니다...</p>
            <span>여기는 날짜입니다.</span>
          </li>
          <li>
            <span>여기는 제목이 옵니다...</span>
            <p>여기는 본문입니다...</p>
            <span>여기는 날짜입니다.</span>
          </li>
          <li>
            <span>여기는 제목이 옵니다...</span>
            <p>여기는 본문입니다...</p>
            <span>여기는 날짜입니다.</span>
          </li>
        </ul>
      </div>
      <div>
        <span>Project</span>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
};

export default Main;
