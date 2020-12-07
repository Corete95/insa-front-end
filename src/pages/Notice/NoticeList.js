import React from "react";
import Listinfo from "./Listinfo";

const NoticeList = ({ listMock }) => {
  console.log("데이터 확인 작업 입니다.", listMock);
  return (
    <div>
      {listMock.notices?.map((listMock, idx) => (
        <Listinfo listMock={listMock} key={idx} />
      ))}
    </div>
  );
};

export default NoticeList;
