import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineRight } from "react-icons/ai";
import ProjectComponet from "../../components/ProjectComponent/ProjectCompnonent";
import { API } from "../../config";
import { Link } from "react-router-dom";
import "./Main.scss";

const Main = () => {
  const [noticeContents, setNoticeContents] = useState([]);
  const [mainProjectList, setMainProjectList] = useState([]);

  useEffect(() => {
    fetch(`${API}/notice/main`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setNoticeContents(data.returning_notices);
      });
  }, []);

  useEffect(() => {
    fetch(`${API}/project/main`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setMainProjectList(data.main_list);
      });
  }, []);

  console.log(mainProjectList);
  return (
    <Container>
      <NoticeContainer>
        <MainTitle>
          Notice <AiOutlineRight className="rightArrow" />
        </MainTitle>
        <ul>
          {noticeContents?.map((element) => {
            return (
              <Link to={`/NoticeDetailPage/${element.id}`}>
                <span className="title">{element.title}</span>
                <p>{element.content}</p>
                <span className="date">{element.date}</span>
              </Link>
            );
          })}
        </ul>
      </NoticeContainer>
      <ProjectContainer>
        <MainTitle project>
          Project <AiOutlineRight className="rightArrow" />
        </MainTitle>
        <div className="mainProjectContainer">
          {mainProjectList?.map((element, idx) => {
            return (
              <ProjectComponet
                idx={idx}
                id={element.id}
                title={element.title}
                member={element.participants}
                icon={element.is_private}
                description={element.description}
                start_date={element.start_date}
                end_date={element.end_date}
              ></ProjectComponet>
            );
          })}
        </div>
      </ProjectContainer>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  margin-left: 315px;
  z-index: -10;
`;

const NoticeContainer = styled.div`
  display: flex;
  margin: 94px 0px 0px 8em;

  ul {
    display: flex;
    justify-content: space-between;

    a {
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
        line-height: 1.5;
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
        margin: 10px 0px;
        color: #999999;
        font-size: 12px;
      }
    }
  }
`;

const MainTitle = styled.span`
  margin-bottom: ${(props) => (props.project ? "25px" : "0px")};
  display: inline-block;
  font-size: 40px;
  color: #33508b;

  .rightArrow {
    font-size: 32px;
  }
`;

const ProjectContainer = styled.div`
  margin: 94px 0px 0px 8em;

  .mainProjectContainer {
    display: flex;
  }
`;
