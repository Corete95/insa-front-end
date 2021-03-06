import React, { useEffect, useState } from "react";
import "./Project.scss";
import { BsSearch, BsGrid, BsPlus } from "react-icons/bs";
import { MdSort } from "react-icons/md";
import ProjectComponent from "../../components/ProjectComponent/ProjectCompnonent";
import ProjectList from "../../components/ProjectComponent/ProjectList";
import { API } from "../../config";

const Project = () => {
  const [project_data, SetProject] = useState([]);
  const [bookmark, SetBookmark] = useState([]);
  const [focusedMenu, SetFocusedMenu] = useState("showAll");
  const [listMenu, SetListMenu] = useState(true);
  const [searchTerm, SetSearchTerm] = useState("");
  const [searchResults, SetSearchResults] = useState([]);

  useEffect(() => {
    fetch(`${API}/project/list`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then((res) => res.json())
      .then((data) => {
        SetProject(data.main_list);
      });
  }, []);

  useEffect(() => {
    if (focusedMenu !== "bookmark") {
      return;
    }
    fetch(`${API}/project/like`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then((res) => res.json())
      .then((data) => {
        SetBookmark(data.like_list);
      });
  }, [focusedMenu]);

  const handleBtnColor = (e) => {
    SetFocusedMenu(e.target.id);
  };

  const makeItList = () => {
    SetListMenu(!listMenu);
  };

  const handleChange = (e) => {
    SetSearchTerm(e.target.value);
  };

  useEffect(() => {
    const results = project_data.filter((listOfProject) =>
      listOfProject.title.includes(searchTerm)
    );
    searchTerm === ""
      ? SetSearchResults(project_data)
      : SetSearchResults(results);
  }, [searchTerm, project_data, bookmark]);

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
          <input
            placeholder="검색어를 입력하세요"
            onChange={handleChange}
            value={searchTerm}
          />
        </div>
        <div className="projectIcons">
          <MdSort
            id="sortList"
            className="filterIcon"
            onClick={makeItList}
            size="34px"
          />
          <BsGrid id="gridList" onClick={makeItList} size="30px" />
        </div>
      </div>
      {focusedMenu === "showAll" ? (
        <div className="projectCards">
          <div className={listMenu ? "newProject" : "newListProject"}>
            <BsPlus className="plusIcon" />
            {listMenu ? (
              <p>
                New <br />
                Project
              </p>
            ) : (
              <p> New Project</p>
            )}
          </div>

          {searchResults.map((project_data, idx) => {
            if (listMenu === true) {
              return (
                <ProjectComponent
                  key={project_data.id + "allProject" + idx}
                  id={project_data.id}
                  title={project_data.title}
                  description={project_data.description}
                  member={project_data.participants}
                />
              );
            } else {
              return (
                <ProjectList
                  key={project_data.id + "listedMenu" + idx}
                  id={project_data.id}
                  title={project_data.title}
                  participants={project_data.participants}
                />
              );
            }
          })}
        </div>
      ) : (
        <div className="bookmarkedProject">
          {bookmark.map((bookmark, idx) => {
            if (listMenu === true) {
              return (
                <ProjectComponent
                  key={bookmark.id + "bookmarkMenu" + idx}
                  id={bookmark.id}
                  title={bookmark.title}
                  description={bookmark.description}
                  participants={bookmark.participants}
                />
              );
            } else {
              return (
                <ProjectList
                  key={bookmark.id + "bookmarkList" + idx}
                  id={bookmark.id}
                  title={bookmark.title}
                  participants={bookmark.participants}
                />
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Project;
