import React, { useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import "./ProjectList.scss";

const ProjectList = ({ title, member }) => {
  const [bookmark, setBookmark] = useState(false);

  const handleBookmark = () => {
    setBookmark(!bookmark);
  };

  return (
    <div className="listProjectComponent">
      <div className="projectContents">
        <p>{member}명 참여중</p>
        <h3>{title}</h3>
      </div>
      <div className="bookmarkIcon" onClick={handleBookmark}>
        {bookmark ? (
          <BsBookmarkFill className="bookmarkFillIcon" />
        ) : (
          <BsBookmark className="bookmarkIcon" />
        )}
      </div>
    </div>
  );
};

export default ProjectList;
