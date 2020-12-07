import React from "react";

const listinfo = ({ listMock, key, pageId }) => {
  return (
    <div className="listBox" key={key}>
      <div className="noNumber">
        <span>{listMock.no}</span>
      </div>
      <div className="listText">
        <span>{listMock.title}</span>
      </div>
      <div className="listDay">
        <span>{listMock.date}</span>
      </div>
    </div>
  );
};

export default listinfo;
