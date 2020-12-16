import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { API } from "../../config";
import axios from "axios";
import "./NoticeWriting.scss";

const NoticeWriting = () => {
  const history = useHistory();
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [files, setfiles] = useState([]);
  const [noticeProps, setnoticeProps] = useState([]);

  const filesChange = (e) => {
    setfiles([...Object.values(e.target.files)]);
  };

  const uploadData = () => {
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("content", content);
    Array.from(files).forEach((file) => {
      formdata.append("attachment", file, file.name);
    });

    axios({
      method: "POST",
      url: `${API}/notice/detail`,
      data: formdata,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("token")
      }
    })
      .then((res) => {
        setnoticeProps(res.data);
        history.push("/Notice");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <>
      {console.log("in return noticeProps", noticeProps)}
      <div>
        <div className="noticeWriting">
          <div className="noticeTitle">
            <span>Notice</span>
          </div>
          <div className="noticeCenter">
            <input
              type="text"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              placeholder="제목"
            />
            <textarea
              value={content}
              onChange={(e) => setcontent(e.target.value)}
              placeholder="내용을 입력하세요."
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
              <Link to="/Notice" className="back">
                뒤로
              </Link>
              <button className="reg" onClick={uploadData}>
                등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(NoticeWriting);
