import React from "react";
import { BsBookmark } from "react-icons/bs";
import "./ProjectComponent.scss";

const ProjectComponet = ({ title, member }) => {
  return (
    <div className="ProjectComponent">
      <div className="projectContent">
        <h3>{title}</h3>
      </div>
      <div className="projectFooter">
        <p>{member}명 참여중</p>
        <BsBookmark color="#999999" />
      </div>
    </div>
  );
};

export default ProjectComponet;
