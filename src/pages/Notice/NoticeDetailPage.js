import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiPaperclip } from "react-icons/fi";
import axios from "axios";

const mockData = {
  title: "데이터 로딩 중 입니다",
  created_at: "20-12-04",
  content: "데이터 로딩 중 입니다"
};

const NoticeDetailPage = () => {
  const [noticeData, setNoticeData] = useState(mockData);
  const [isInEditMode, setIsInEditMode] = useState(false);

  const demoInputRef = useRef();

  const changeEditMode = () => {
    setIsInEditMode(!isInEditMode);
  };

  const onChangeTitle = (e) => {
    const { value } = e.target;
    setNoticeData({ ...noticeData, title: value });
  };

  const onChangeContent = (e) => {
    const { value } = e.target;
    setNoticeData({ ...noticeData, content: value });
  };

  const defaultEditButton = () => {
    return <button onClick={changeEditMode}>수정</button>;
  };

  const changingEditButton = () => {
    return (
      <button className="changingButton" onClick={changeEditMode}>
        수정 완료
      </button>
    );
  };

  const EditTitle = () => {
    return (
      <input
        type="text"
        value={noticeData?.title}
        ref={demoInputRef}
        onChange={onChangeTitle}
      />
    );
  };

  const EditContent = () => {
    return (
      <input
        type="text"
        value={noticeData?.content}
        ref={demoInputRef}
        onChange={onChangeContent}
      />
    );
  };

  const defaultTitle = () => {
    return <h3 className="noticeBorderTitle">{noticeData?.title}</h3>;
  };

  const defaultContent = () => {
    return <div>{noticeData?.content}</div>;
  };

  useEffect(() => {
    axios
      .get("http://192.168.0.139:8000/notice/detail/42")
      .then((response) => {
        setNoticeData(response.data.notice);
      })
      .catch((response) => {
        console.log("error");
      });
  }, []);

  const resultPhotoData = noticeData.attachments?.filter((element) => {
    element.includes("+image/jpeg");
  });

  console.log("데이터 형식 확인", noticeData);

  return (
    <NoticeWhiteBackground>
      <div className="blackSpace">
        <NoticeDetailTitle>Notice</NoticeDetailTitle>
      </div>
      <NoticePageContainer>
        <div className="upperButton">
          {isInEditMode ? changingEditButton() : defaultEditButton()}
          <button>삭제</button>
        </div>
        <div className="NoticeWholeContainer">
          <div className="titleContainer">
            {isInEditMode ? EditTitle() : defaultTitle()}
            <span className="titleDate">{noticeData?.created_at}</span>
          </div>
          <div className="NoticeContentsContainer">
            <p>
              {isInEditMode ? EditContent() : defaultContent()}
              {resultPhotoData?.map((element) => {
                if (element.includes("+image/jpeg")) {
                  element = element.replaceAll("+image/jpeg", "");
                }
                return <img src={element} alt="공지사항 사진입니다." />;
              })}
            </p>
            <button className="addFile">
              <FiPaperclip />
              &nbsp; 파일 첨부
            </button>
          </div>
          <div>
            <BelowInfo>
              <span>이전 글</span>
              <Link>
                <span>제목 샘플</span>
              </Link>
              <span>2020-11-25</span>
            </BelowInfo>
            <BelowInfo>
              <span>다음 글</span>
              <Link>
                <span>제목 샘플</span>
              </Link>
              <span>2020-11-25</span>
            </BelowInfo>
          </div>
        </div>
        <ListButtonTag>
          <Link to="/Notice">목록</Link>
        </ListButtonTag>
      </NoticePageContainer>
    </NoticeWhiteBackground>
  );
};

export default NoticeDetailPage;

const NoticeWhiteBackground = styled.div`
  margin-left: 315px;
  width: 1416px;
  background-color: #ffffff;
  z-index: -700;

  .blackSpace {
    padding: 10px;
  }
`;

const NoticeDetailTitle = styled.h1`
  margin: 56px auto;
  width: 250px;
  height: 112px;
  text-align: center;
  color: #33508b;
  font-size: 80px;
`;

const NoticePageContainer = styled.section`
  margin: 0px auto;
  width: 1226px;
  height: 100%;

  .upperButton {
    display: flex;
    justify-content: flex-end;

    button {
      margin-right: 10px;
      padding: 0px;
      width: 40px;
      border-bottom: 1px solid black;
      font-size: 15px;
      cursor: pointer;
    }

    .changingButton {
      margin-right: 10px;
      padding: 0px;
      width: 80px;
      border-bottom: 1px solid black;
      font-size: 15px;
      cursor: pointer;
    }
  }

  .NoticeWholeContainer {
    margin-top: 25px;
    border-top: 3px solid black;
    border-bottom: 3px solid black;

    .titleContainer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 20px;
      height: 80px;
      border-bottom: 2px solid #979797;

      .noticeBorderTitle {
        font-size: 24px;
      }

      .titleDate {
        font-size: 16px;
      }
    }

    .NoticeContentsContainer {
      padding: 50px 30px;

      p {
        font-size: 16px;
        line-height: 1.5em;
      }

      .addFile {
        margin-top: 60px;
      }
    }
  }
`;

const BelowInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  border-top: 1px solid #979797;

  a {
    width: 900px;
  }
`;

const ListButtonTag = styled.div`
  padding: 80px 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  a {
    padding: 17px;
    width: 116px;
    height: 50px;
    text-align: center;
    color: #ffffff;
    background-color: #000000;
    border-radius: 60px / 50px;
  }
`;
