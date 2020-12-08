import React, { useState } from "react";
import { Link } from "react-router-dom";

const listinfo = ({ listMock, key }) => {
  return (
    <Link to={`/NoticeDetailPage/${listMock.no}`}>
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
    </Link>
  );
};

export default listinfo;
