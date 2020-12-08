import React, { useState } from "react";
import axios from "axios";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { YJ_API } from "../../config";
import { useHistory } from "react-router-dom";
import "./ProjectComponent.scss";

const ProjectComponet = ({
  id,
  title,
  participants,
  description,
  start_date,
  end_date
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const history = useHistory();

  const handleBookmark = () => {
    setIsLiked(!isLiked);

    axios.post(`${YJ_API}/project/like/${id}`, {
      project_id: id
    });
  };

  const goToDetail = () => {
    history.push(`/ProjectDetail/${id}`);
    alert("이동!");
  };

  console.log(id);

  return (
    <div className="gridProjectComponent">
      <div className="projectContent" onClick={goToDetail}>
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
        <p>{participants}명 참여중</p>
        <div className="bookmarkIcon" onClick={handleBookmark}>
          {isLiked ? (
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
