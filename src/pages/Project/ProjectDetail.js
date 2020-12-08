import React, { useState } from "react";
import CommentList from "./CommentList";
import { API } from "../../config";
import axios from "axios";
import "./ProjectDetail.scss";

const ProjectDetail = () => {
  const [projectData, setprojectData] = useState([]);
  const [content, setcontent] = useState("");
  const [files, setfiles] = useState([]);

  const commentUpload = () => {
    const formdata = new FormData();
    formdata.append("content", content);
    Array.from(files).forEach((file) => {
      formdata.append("attachment", file);
    });

    axios({
      method: "POST",
      url: `${API}/project/detail`,
      data: formdata,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then((res) => {
        setprojectData(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const filesChange = (e) => {
    setfiles([...Object.values(e.target.files)]);
  };

  return (
    <>
      <div className="projectDetail">
        <div className="projectTitle">
          <span>Project</span>
          <span className="projectSubTitle">동영상 상황 판단 검사</span>
        </div>
        <div className="projectCenter">
          <div className="searchDiv">
            <div className="search">
              <span>
                <i class="xi-search"></i>
              </span>
              <input
                name="search"
                type="search"
                placeholder="검색어를 입력하세요"
              />
            </div>
          </div>
          <div className="projectText">
            <textarea
              value={content}
              placeholder="내용을 입력하세요."
              onChange={(e) => setcontent(e.target.value)}
            />
            <div className="attachments">
              <div className="attachmentsDiv">
                <i class="xi-paperclip"></i>
                <label className="fileUpLoad" for="fileUpLoad">
                  파일첨부
                </label>
                <input
                  className="fileUpLoad"
                  name="files"
                  id="fileUpLoad"
                  type="file"
                  onChange={filesChange}
                  style={{ display: "none" }}
                  multiple
                />
              </div>
            </div>
            <div className="buttonLine">
              <button onClick={commentUpload} className="reg">
                등록
              </button>
            </div>
          </div>
          <ul>
            <li>
              {projectData?.map((data, idx) => (
                <CommentList data={data} key={idx} />
              ))}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
