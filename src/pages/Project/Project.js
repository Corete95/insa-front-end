import React, { useEffect, useState } from "react";
import "./Project.scss";
import { BsSearch, BsGrid, BsPlus } from "react-icons/bs";
import { MdSort } from "react-icons/md";
import ProjectComponet from "../../components/ProjectComponent/ProjectCompnonent";
import ProjectList from "../../components/ProjectComponent/ProjectList";

const Project = () => {
  const [project_data, setProject] = useState([]);
  const [focusedMenu, SetFocusedMenu] = useState("showAll");
  const [listMenu, SetListMenu] = useState(true);

  useEffect(() => {
    fetch("/Data/Projectdata.json")
      .then((res) => res.json())
      .then((res) => {
        setProject(res.project_data);
      });
  }, []);

  const handleBtnColor = (e) => {
    SetFocusedMenu(e.target.id);
  };

  const makeItList = () => {
    SetListMenu(!listMenu);
  };

  return (
    <div className="Project">
      <h1>Project</h1>
      <div className="projectSortBtn">
        <button
          id="showAll"
          className={focusedMenu === "showAll" ? "blueBtn" : "grayBtn"}
          onClick={(e) => handleBtnColor(e)}
        >
          전체보기
        </button>
        <button
          id="bookmark"
          className={focusedMenu === "bookmark" ? "blueBtn" : "grayBtn"}
          onClick={(e) => handleBtnColor(e)}
        >
          즐겨찾기
        </button>
      </div>
      <div className="projectSortArea">
        <div className="search">
          <BsSearch className="searchIcon" />
          <input placeholder="검색어를 입력하세요" />
        </div>
        <div className="projectIcons">
          <MdSort className="filterIcon" onClick={makeItList} />
          <BsGrid onClick={makeItList} />
        </div>
      </div>
      <div>
        <div className="projectCards">
          <div className={listMenu ? "newProject" : "newListProject"}>
            <BsPlus className="plusIcon" />
            <p>
              New <br />
              Project
            </p>
          </div>
          {project_data.map((project_data) => {
            if (listMenu === true) {
              return (
                <ProjectComponet
                  key={project_data.id}
                  id={project_data.id}
                  title={project_data.title}
                  member={project_data.member}
                />
              );
            } else {
              return (
                <ProjectList
                  key={project_data.id}
                  id={project_data.id}
                  title={project_data.title}
                  member={project_data.member}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Project;
