import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiPaperclip } from "react-icons/fi";
import { API } from "../../config";
import axios from "axios";

const mockData = {
  title: "데이터 로딩 중 입니다",
  created_at: "20-12-04",
  content: "데이터 로딩 중 입니다"
};

const NoticeDetailPage = ({ match }) => {
  const [noticeData, setNoticeData] = useState(mockData);
  const [idNumber, setIdNumber] = useState(null);
  const [noticePrevious, setNoticePrevious] = useState(mockData);
  const [noticeNext, setNoticeNext] = useState(mockData);
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
      <EditTitleTag
        type="text"
        value={noticeData?.title}
        ref={demoInputRef}
        onChange={onChangeTitle}
      />
    );
  };

  const EditContent = () => {
    return (
      <EditContentTag
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
      .get(`${API}/notice/detail/${match.params.id}`)
      .then((response) => {
        setIdNumber(match.params.id);
        setNoticeData(response.data.notice);
        setNoticePrevious(response.data.previous);
        setNoticeNext(response.data.next);
      })
      .catch((response) => {
        alert("데이터를 불러 올 수 없음");
      });
  }, [idNumber]);

  const resultPhotoData = noticeData.attachments?.filter((element) => {
    let result;
    return (result = element.includes("+image/jpeg"));
  });

  const removePage = async () => {
    if (
      window.confirm(
        "해당 게시물을 삭제하시겠습니까? \n삭제된 데이터는 복구할 수 없습니다."
      )
    ) {
      await axios.delete(`${API}/notice/detail/${match.params.id}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      alert("게시물이 삭제되었습니다.");
      return (window.location.href = "/Notice");
    }
  };

  return (
    <NoticeWhiteBackground>
      <div className="blackSpace">
        <NoticeDetailTitle>Notice</NoticeDetailTitle>
      </div>
      <NoticePageContainer>
        <div className="upperButton">
          {isInEditMode ? changingEditButton() : defaultEditButton()}
          <button onClick={removePage}>삭제</button>
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
              <Link download>
                <FiPaperclip />
                &nbsp; 파일 첨부
              </Link>
            </button>
          </div>
          <div>
            <BelowInfo>
              <span>이전 글</span>
              {match.params.id - 1 !== 0 && (
                <Link
                  to={`/NoticeDetailPage/${match.params.id - 1}`}
                  onClick={() => setIdNumber(idNumber - 1)}
                >
                  <span>{noticePrevious?.title}</span>
                </Link>
              )}
              <span>{noticePrevious?.created_at}</span>
            </BelowInfo>
            <BelowInfo>
              <span>다음 글</span>
              <Link
                to={`/NoticeDetailPage/${Number(match.params.id) + 1}`}
                onClick={() => setIdNumber(Number(idNumber) + 1)}
              >
                <span>{noticeNext?.title}</span>
              </Link>
              <span>{noticeNext?.created_at}</span>
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

const EditTitleTag = styled.input`
  width: 90%;
  height: 33px;
  font-size: 24px;
  font-weight: bold;
  border-style: none none solid none;
`;

const EditContentTag = styled.textarea`
  width: 100%;
  height: 415px;
`;
