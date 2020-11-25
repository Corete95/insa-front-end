import React, { useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import "./ProjectComponent.scss";

const ProjectComponet = ({
  title,
  member,
  description,
  start_date,
  end_date
}) => {
  const [bookmark, setBookmark] = useState(false);

  const handleBookmark = () => {
    setBookmark(!bookmark);
  };

  return (
    <div className="gridProjectComponent">
      <div className="projectContent">
        <h3>{title}</h3>
      </div>
      <div>
        <div>{description}테스트 디스크립션</div>
        <span>
          {start_date}2020-11-01~{end_date}2020-11-10
        </span>
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
