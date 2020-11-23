import React, { useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import "./ProjectComponent.scss";

const ProjectComponet = ({ title, member }) => {
  const [bookmark, setBookmark] = useState(false);

  const handleBookmark = () => {
    setBookmark(!bookmark);
  };

  console.log("????", handleBookmark);
  return (
    <div className="gridProjectComponent">
      <div className="projectContent">
        <h3>{title}</h3>
      </div>
      <div className="projectFooter">
        <p>{member}명 참여중</p>
        <div className="bookmarkIcon" onClick={handleBookmark}>
          {bookmark ? (
            <BsBookmarkFill className="bookmarkFillIcon" />
          ) : (
            <BsBookmark className="bookmarkIcon" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectComponet;
