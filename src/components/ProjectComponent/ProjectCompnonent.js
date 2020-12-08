import React, { useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import "./ProjectComponent.scss";

const ProjectComponet = ({
  title,
  member,
  description,
  start_date,
  end_date,
  icon
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
      <div className="projectContentContainer">
        <div className="projectDescription">{description}</div>
        <div className="projectPeriod">
          <span>
            {start_date} ~ {end_date}
          </span>
        </div>
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
