import React, { useState } from "react";
import axios from "axios";
import "./NoticeWriting.scss";

const NoticeWriting = () => {
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [files, setfiles] = useState([]);
  const [noticeProps, setnoticeProps] = useState([]);

  const filesChange = (e) => {
    setfiles(e.target.files[0]);
  };

  const uploadData = () => {
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("content", content);
    formdata.append("attachment", files);

    axios({
      method: "POST",
      url: "http://192.168.0.11:8000/notice/detail",
      data: formdata,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then((res) => {
        setnoticeProps(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  console.log(noticeProps);
  return (
    <>
      <div>
        <div className="nav">NAV</div>
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
                  name="files[]"
                  id="fileUpLoad"
                  type="file"
                  onChange={filesChange}
                  style={{ display: "none" }}
                  multiple="multiple"
                />
              </div>
            </div>
            <div className="buttonLine">
              <button className="back">뒤로</button>
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

export default NoticeWriting;
