import React from "react";
import styled from "styled-components";
import { AiOutlineRight } from "react-icons/ai";
import "./Main.scss";

const Main = () => {
  const Notice = [
    {
      id: 1,
      title: "첫 번째 제목",
      content:
        "아무말 마우맘ㄹ마마ㅜㅏㅜㅇ리ㅏㅇㄴㄹ 안녕하세요 오늘은 제가 무엇을 해볼것이냐면",
      date: "2020-03-24"
    },
    {
      id: 2,
      title: "두 번째 제목",
      content:
        "아무말 마우ㄴㅇㄻㅁㅇㄴㄹㄴㅇㄹㄴㅁㅇㄹ맘ㄹ마마ㅜㅏㅜㅇ리ㅏㅇㄴㄹ반면 위의 코드는 비동기적 코드의 예시 입니다. 코드가 순차적으로 읽히기는 하지만 실행된 결과값은 순차적이지 않죠. 맨 처음 1이 불러와진 후에 setTimeOut으로 결과값이 1초 뒤에 불러와지는 동안 그 뒤 코드인 3이 실행되고 나서 2가 불러와졌습니다.왜 이런 현상이 발생하는 것일까요? 만일 모든 코드가 동기적으로 이루어진다면, 많은 양의 데이터를 서버에서 불러와야하는 코드들이 있는 경우에 사용자는 서버와의 통신이 끝날 때까지 빈 화면을 기다려야 할 것입니다. 주고 받아야 하는 코드의 양이 크기 때문이죠. 하지만 비동기적으로 코드를 실행한다면, 우선 빠르게 처리할 수 있는 함수들을 실행하고 그 후에 불러온 데이터를 활용하여 페이지를 꾸밀 수 있겠죠. 즉, 비동기적인 처리는 사용자가 대기해야 하는 시간을 단축해주고 UX적 측면에서 보다 나은 환경을 제공하기 위한 특성이라고 할 수 있습니다.  콜백지옥과 Pr",
      date: "2020-03-23"
    },
    {
      id: 3,
      title:
        "세 번째 제목인줄 알았지만 그것이 아니라 그것보다 긴 텍스트를 실험해보기 위함이었다",
      content:
        "아무말 마우맘ㄹ마마ㅜㅁㄴㅇㅁㄴㅇㅂㅈㅈㅂㅏㅜdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddㅇ리ㅏㅇㄴㄹ",
      date: "2020-03-22"
    }
  ];

  return (
    <>
      <Container>
        <NoticeContainer>
          <MainTitle>
            Notice <AiOutlineRight className="rightArrow" />
          </MainTitle>
          <ul>
            {Notice.map((element) => {
              return (
                <li>
                  <span className="title">{element.title}</span>
                  <p>{element.content}</p>
                  <span className="date">{element.date}</span>
                </li>
              );
            })}
          </ul>
        </NoticeContainer>
        <div>
          <MainTitle>
            Project <AiOutlineRight className="rightArrow" />
          </MainTitle>
          <ul>
            <gridProjectComponent></gridProjectComponent>
            <gridProjectComponent></gridProjectComponent>
            <gridProjectComponent></gridProjectComponent>
            <gridProjectComponent></gridProjectComponent>
          </ul>
        </div>
      </Container>
    </>
  );
};

export default Main;

const Container = styled.div`
  margin-left: 315px;
  z-index: -10;
`;

const NoticeContainer = styled.div`
  display: flex;
  margin: 94px 0px 0px 10em;

  ul {
    display: flex;
    justify-content: space-between;

    li {
      list-style: none;
      margin-left: 40px;
      width: 270px;
      height: 184px;
      border-bottom: 1px solid gray;

      .title {
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 270px;
        font-size: 20px;
        margin-bottom: 10px;
      }

      p {
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
        line-height: 1.28;
        width: 270px;
        height: 120px;
        color: #999999;
        font-size: 16px;
      }

      .date {
        display: inline-block;
        margin: 10px 0px;
        color: #999999;
        font-size: 12px;
      }
    }
  }
`;

const MainTitle = styled.span`
  display: inline-block;
  font-size: 40px;
  color: #33508b;

  .rightArrow {
    font-size: 32px;
  }
`;

const gridProjectComponent = styled.li`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-between;
  width: 284px;
  height: 270px;
  padding: 11px;
  margin: 0 30px 40px 0;
  @media (max-width: 768px) {
    margin: 0 26px 40px 0;
  }
  background-color: #ffff;
  .projectContent {
    height: 119px;
    padding: 19px;
    h3 {
      font-size: 20px;
      font-weight: 500;
      line-height: 29px;
    }
  }
  .projectFooter {
    display: flex;
    justify-content: space-between;
    width: 254px;
    height: 47px;
    border-top: 1px solid lightgray;
    padding: 20px 0 10px 8px;
    margin-top: auto;
    p {
      color: #999999;
      font-size: 12px;
    }
  }
  .bookmarkIcon {
    color: #999999;
  }
  .bookmarkFillIcon {
    color: #fe4e00;
  }
`;
