import React, { useEffect, useState } from "react";
import "./Project.scss";
import { BsGrid, BsPlus, BsFilterLeft } from "react-icons/bs";
import ProjectComponet from "../../components/ProjectComponent/ProjectCompnonent";

const Project = () => {
  const [project_data, setProject] = useState([]);
  useEffect(() => {
    fetch("/Data/Projectdata.json")
      .then((res) => res.json())
      .then((res) => {
        setProject(res.project_data);
      });
  }, []);

  const [changeBtn, activatedBtn] = useState(false);

  const handleBtnColor = () => {
    activatedBtn(!changeBtn);
    console.log("button clicked!");
  };

  return (
    <div className="Project">
      <h1>Project</h1>
      <div className="projectSortBtn">
        {changeBtn === true ? (
          <button className="blueBtn" onClick={handleBtnColor}>
            전체보기
          </button>
        ) : (
          <button className="grayBtn" onClick={handleBtnColor}>
            전체보기
          </button>
        )}
        <button className="blueBtn">즐겨찾기</button>
      </div>
      <div className="projectSortArea">
        <input placeholder="검색어를 입력하세요" />
        <div className="projectIcons">
          <BsFilterLeft color="#999999" />
          <BsGrid />
        </div>
      </div>
      <div>
        <div className="projectCards">
          <div className="newProject">
            <BsPlus size="45px" />
            <p>
              New <br />
              Project
            </p>
          </div>

          {project_data.map((project_data) => {
            return (
              <ProjectComponet
                key={project_data.id}
                id={project_data.id}
                title={project_data.title}
                member={project_data.member}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Project;
