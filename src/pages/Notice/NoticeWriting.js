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

  // const filesChange = (e) => {
  //   setfiles(e.target.files[0]);
  // };
  // const filesChange = (e) => {
  //   setfiles({ ...files, [e.target.name]: e.target.files });
  // };
  const filesChange = (e) => {
    console.log("e.target.name", e.target.name);
    console.log("e.target.files", e.target.files);
    console.log("typeof e.target.files", typeof e.target.files);
    console.log("Objective files", Object.values(e.target.files));
    console.log("Objective value 0th index", Object.values(e.target.files)[0]);
    setfiles([...Object.values(e.target.files)]);
  };

  const uploadData = () => {
    console.log("files in axios", files);
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("content", content);
    // formdata.append("attachment", JSON.stringfy(files));
    Array.from(files).forEach((file) => {
      formdata.append("attachment", file, file.name);
    });
    for (var value of formdata.values()) {
      console.log("formdata.values", value);
    }

    // const filelist = Object.keys(files).map((key) => [files[key]]);
    // filelist.forEach((f) => {
    //   formdata.append("attachment", f);
    // });
    // console.log(filelist);
    // formdata.append("attachment", files);
    // formdata.append("attachment[2]", files);
    // for (let i = 0; i < files.length; i++) {
    //   formdata.append("attachment", files.files[i]);
    // }
    // for (let i = 0; i < files.length; i++) {
    //   formdata.append(`attachment[${i}]`, files[i]);
    // }
    // files.map((files) => formdata.append("attachment", files));

    // console.log(files);
    // formdata.attachment = [];
    // console.log(formdata.attachment);
    // for (let i = 0; i < files.length; i++) {
    //   console.log(files[i]);
    //   formdata.attachment.append(files[i]);
    // }

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

  console.log("밖", files);
  console.log("asdasdas", noticeProps);
  return (
    <>
      {console.log("in return files", files)}
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
