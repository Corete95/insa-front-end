import { useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiPaperclip } from "react-icons/fi";

const NoticeDetailPage = () => {
  const [demoValue, setDemoValue] = useState("게시판 수정 기능 공부 중입니다.");
  const [isInEditMode, setIsInEditMode] = useState(false);

  const changeEditMode = () => {
    setIsInEditMode(!isInEditMode);
    console.log("clickclick");
  };

  const updateComponentValue = () => {
    setIsInEditMode(false);
    setDemoValue("어디갔지?");
  };

  const demoInputRef = useRef();

  const renderEditView = () => {
    return (
      <div>
        <input type="text" value={demoValue} ref={demoInputRef} />
        <button onClick={updateComponentValue}>ok</button>
        <button onClick={changeEditMode}>x</button>
      </div>
    );
  };

  const renderDefaultView = () => {
    return <div>{demoValue}</div>;
  };

  return (
    <NoticeWhiteBackground>
      <div className="blackSpace">
        <NoticeDetailTitle>Notice</NoticeDetailTitle>
      </div>
      <NoticePageContainer>
        <div className="upperButton">
          <button onClick={changeEditMode}>수정</button>
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
            <p>
              <img
                src="https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202011/25/poctan/20201125000717193dfss.jpg"
                alt="sdsds"
              />
              [OSEN=고용준 기자] 공격적인 행보로 나섰지만 스프링시즌 8위, 서머
              시즌 9위로 고개 숙였던 2020시즌은 잊어도 좋을 것 같다. 다시 한 번
              팔을 걷어 올려붙인 한화생명이 2021시즌 스토리리그의 승자로 등극했.
              한화생명이 거물급 FA '데프트' 김혁규와 '쵸비' 정지훈을 모두 잡는
              수완을 보였다. 한화생명은 24일 공식 SNS를 통해 '데프트' 김혁규와
              '쵸비' 정지훈의 영입 소식을 밝혔다. 2020시즌 로스터들을 스토브리그
              개막 전에 일찌감치 정리하면서 대규모 리빌딩을 예고했던 한화생명은
              지난 16일 '노페' 정노철 코치와 17일 '바이퍼' 박도현과 '리헨즈'
              손시우와 계약을 종료하면서 전면 리빌딩을 실천에 옮겼다. 지난 24일
              탑 '모건' 박기태와 '윈터' 김요한 영입을 발표하면서 시동을 건
              한화생명은 '데프트' 김혁규 영입전 승자로 이름을 올리면서 대형 FA
              영입을 기대하던 한화팬들의 욕구를 충족시켰다. 리그를 대표하는
              최고의 원거리 딜러에 손꼽히는 김혁규는 특유의 공격적인 플레이와
              쏟아내는 딜링으로 ‘딜링 머신’이란 별명을 가지고 있다 뛰어난
              리더십과 발군의 실력으로 2020시즌 디알엑스 운영의 사령관이었던
              '데프트' 김혁규의 영입으로 한화생명은 팀의 중심을 잡아줄 선수를
              구했다. 여기에 정글러 '캐드' 조성용, 정글 유망주 박미르 영입을
              공개하면서 정글 경쟁 체제를 공지, 팀내 긴장 구도까지 형성했다.
              한화생명의 공격적인 배팅은 여기서 멈추지 않았다. 오후 10시 '쵸비'
              정지훈의 영입을 발표하면서 다시 한 번 e스포츠 업계와 팬들을 놀라게
              했다. 지난 2018년 그리핀을 통해 LCK 무대에 데뷔한 '쵸비' 정지훈은
              2020시즌 디알엑스의 롤드컵 진출을 이끈 미드 라이너 최대어. LCK를
              대표하는 미드 라이너로 평가받고 있다. '데프트' 김혁규와 '쵸비'
              정지훈 등 굵직한 선수들의 마음을 사로잡으면서 스토브리그의 승자로
              거듭난 한화생명이 다가오는 2021시즌 스토브리그의 성과를 그에
              걸맞는 성적으로 보여줄지 벌써부터 기대가 된다. /
              scrapper@osen.co.kr
            </p>
            {isInEditMode ? renderEditView() : renderDefaultView()}
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
          <Link>목록</Link>
        </ListButtonTag>
      </NoticePageContainer>
    </NoticeWhiteBackground>
  );
};

export default NoticeDetailPage;

const NoticeWhiteBackground = styled.div`
  margin-left: 315px;
  /* height: 100%; */
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
  margin: 100px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  a {
    color: #ffffff;
    background-color: #000000;
    border-radius: 30%;
  }
`;
