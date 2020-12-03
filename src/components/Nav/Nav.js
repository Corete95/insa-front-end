import React from "react";
import { Link } from "react-router-dom";
import InsaLogoComponent from "../InsaLogo";
import styled, { keyframes } from "styled-components";
import { FaRegUser } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import "./Nav.scss";

const Nav = () => {
  const menuNames = [
    "프로젝트",
    "공지사항",
    "일정관리",
    "회의실 예약",
    "근태관리",
    "임직원관리"
  ];

  return (
    <>
      <NavContainer>
        <NavLeftContainer>
          <Link to="/Main">
            <InsaLogoComponent />
          </Link>
        </NavLeftContainer>
        <NavCenterContainer>
          {menuNames.map((names) => {
            return <Link>{names}</Link>;
          })}
        </NavCenterContainer>
        <NavRightContainer>
          <Link>
            <FiMail />
          </Link>
          <Link>
            <FaRegUser />
          </Link>
        </NavRightContainer>
      </NavContainer>
      <Ghost />
    </>
  );
};

export default Nav;

const showUp = keyframes`
  from {
    opacity: 0;
  }

  to{
    opacity: 1;
  }
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 90px;
  color: #ffffff;
  background-color: #303030;
  font-size: 16px;
`;

const NavLeftContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 280px;
  margin-left: 31px;

  svg {
    fill: #ffffff;
  }
`;

const NavCenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: -90px;
  padding: 0px 100px;
  width: 1100px;
  height: 24px;
  left: 400px;

  a {
    text-align: center;
    padding: 5px 0px;
    width: 130px;
    height: 30px;
    text-decoration: none;
    color: #ffffff;
    border-radius: 4px;
    user-select: none;

    :hover {
      color: #303030;
      background-color: #ffffff;
      transition-property: color, background-color;
      transition-duration: 0.3s;
      transition-timing-function: linear;
    }
  }
`;

const NavRightContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 50px;
  width: 100px;
  font-size: 28px;

  a {
    text-decoration: none;
    color: #ffffff;
    user-select: none;

    :hover {
      animation: ${showUp} 0.8s linear;
    }
  }
`;

const Ghost = styled.div`
  height: 90px;
`;
