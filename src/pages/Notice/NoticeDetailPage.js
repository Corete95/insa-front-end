import styled from "styled-components";

const NoticeDetailPage = () => {
  return (
    <NoticeWhiteBackground>
      <div className="blackSpace">
        <NoticeDetailTitle>Notice</NoticeDetailTitle>
      </div>
      <NoticePageContainer>
        <div className="upperButton">
          <button>수정</button>
          <button>삭제</button>
        </div>
        <div className="NoticeWholeContainer">
          <div className="titleContainer">
            <h3 className="noticeBorderTitle">
              Hi 노동법 개정이 전세가격에 미치는 영향
            </h3>
            <span className="titleDate">20-05-14</span>
          </div>
          <div className="NoticeContentsContainer">
            <p></p>
            <button>파일 첨부</button>
          </div>
          <div className="belowInfoCenter">
            <div className="belowInfo">
              <span>이전 글</span>
              <div>
                <span>제목 샘플</span>
              </div>
              <span>날짜 샘플</span>
            </div>
            <div className="belowInfo">
              <span>다음 글</span>
              <div>
                <span>제목 샘플</span>
              </div>
              <span>날짜 샘플</span>
            </div>
          </div>
        </div>
        <div>
          <button>목록</button>
        </div>
      </NoticePageContainer>
    </NoticeWhiteBackground>
  );
};

export default NoticeDetailPage;

const NoticeWhiteBackground = styled.div`
  margin-left: 315px;
  height: 89.4vh;
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

  .upperButton {
    display: flex;
    justify-content: flex-end;

    button {
      margin-right: 10px;
      padding: 0px;
      width: 25px;
      border-bottom: 1px solid black;
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
    }

    .belowInfoCenter {
      .belowInfo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        border-top: 1px solid #979797;
      }
    }
  }
`;
