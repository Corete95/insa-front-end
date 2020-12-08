import React from "react";

const CommentList = ({ data, key }) => {
  return (
    <div className="commentBox" key={key}>
      <div className="commentHeader">
        <div className="title">
          <span>{data.name}</span>
          <div className="deleteModify">
            <span>수정</span>
            <span>삭제</span>
          </div>
        </div>
        <div className="dayTime">
          <span>{data.Day}</span>
        </div>
        <div className="line"></div>
      </div>
      <div className="commentCenter">{data.text}</div>
      <div className="commentFiles">
        <div className="file">첨부파일 입니다.</div>
      </div>
      <div className="commentFooter">
        <span>댓글 {data.comment}개</span>
        <div className="commentThread">
          <input type="text" placeholder="댓글 남기기 ..." />
          <button>등록</button>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
