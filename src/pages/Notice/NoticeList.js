import React from "react";
import Listinfo from "./Listinfo";

const NoticeList = ({ listMock }) => {
  return (
    <div>
      {listMock.notices?.map((listMock, idx) => (
        <Listinfo listMock={listMock} key={idx} />
      ))}
    </div>
  );
};

export default NoticeList;
