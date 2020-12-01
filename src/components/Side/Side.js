import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from "../../components/Side/components/react-calendar/src/Calendar";
import axios from "axios";
import { BsPlus } from "react-icons/bs";
import "./Side.scss";

const Side = () => {
  const [value, onChange] = useState(new Date());
  const [hiddenState, setHiddenState] = useState(false);
  const [userState, setUserState] = useState("근무 중");

  const [onWorking, setOnWorking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [nowTime, setNowTime] = useState(null);
  const [pauseTime, setPauseTime] = useState(null);
  const [reStartTime, setReStartTime] = useState(null);
  const [workingHours, setWorkingHours] = useState(new Date(0));

  const stateName = ["근무 중", "식사", "휴식"];

  const showingButton = () => {
    setHiddenState(!hiddenState);
  };

  let interval;

  const timer = () => {
    if (!startTime) {
      setStartTime(new Date());
      setOnWorking(true);
    } else if (startTime && pauseTime) {
      let plusTime = reStartTime - pauseTime;
      console.log(typeof plusTime);
      new Date(plusTime);
      console.log(typeof plusTime);
      setStartTime(new Date(startTime + plusTime));
    }
    console.log("시작 시간", startTime);
    console.log(typeof nowTime);
    console.log(typeof startTime);
    setNowTime(new Date());
    setWorkingHours(new Date(nowTime - startTime));
  };

  useEffect(() => {
    if (onWorking) {
      interval = setInterval(() => timer(), 1000);
    }
    return () => clearInterval(interval);
  }, [workingHours, onWorking]);

  const resumeTimer = (e) => {
    if (workingHours.getTime() > 0) {
      setUserState(e.target.value);
      setOnWorking(true);
      setReStartTime(new Date());
    }
  };

  const stopTimer = (e) => {
    if (workingHours.getTime() > 0) {
      setUserState(e.target.value);
      setOnWorking(false);
      setPauseTime(new Date());
      clearTimeout(interval);
    }
  };

  const finishTimer = () => {
    setOnWorking(false);
    setStartTime(null);
    setWorkingHours(new Date(0));
    clearTimeout(interval);
  };

  return (
    <SideBarContainer>
      <Profile>
        <div className="profileContainer">
          <img
            src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80"
            alt="예시 입니다."
          />
          <BsPlus className="plusButton" />
        </div>
        <div className="userData">
          <div className="userState">{userState}</div>
          <div className="userName">
            김인사
            <StateChangeButton onClick={showingButton}>▼</StateChangeButton>
          </div>
          <div className="hiddenContainer">
            {stateName.map((state, idx) => {
              return (
                <>
                  {idx === 0 && (
                    <HiddenButton
                      idx={idx}
                      hiddenState={hiddenState}
                      value={state}
                      onClick={(e) => {
                        resumeTimer(e);
                      }}
                    >
                      {state}
                    </HiddenButton>
                  )}
                  {idx !== 0 && (
                    <HiddenButton
                      idx={idx}
                      hiddenState={hiddenState}
                      value={state}
                      onClick={(e) => {
                        stopTimer(e);
                      }}
                    >
                      {state}
                    </HiddenButton>
                  )}
                </>
              );
            })}
          </div>
          <div className="dDay">D +555</div>
        </div>
        <div>
          {workingHours.getHours() - 9}시간 {workingHours.getMinutes()}분{" "}
          {workingHours.getSeconds()}초
        </div>
      </Profile>
      <Calendar onChange={onChange} value={value} />
      <WorkingState>
        <div>
          <button
            className="belowButton"
            onClick={() => {
              timer();
            }}
          >
            출근하기
          </button>
          <button
            className="belowButton"
            onClick={() => {
              finishTimer();
            }}
          >
            퇴근하기
          </button>
        </div>
      </WorkingState>
    </SideBarContainer>
  );
};

export default Side;

const SideBarContainer = styled.aside`
  position: fixed;
  text-align: center;
  width: 315px;
  height: calc(100% - 90px);
  background-color: rgba(34, 34, 34, 0.5);
  z-index: -1;
`;

const Profile = styled.div`
  margin: 80px 0px 60px 0px;
  color: #ffffff;

  .profileContainer {
    width: 100%;
    height: 161px;

    img {
      width: 51%;
      height: 100%;
      border-radius: 50%;
    }

    .plusButton {
      position: absolute;
      top: 205px;
      left: 203px;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      outline: none;
      background-color: #c7bdae;

      :hover {
        width: 37px;
        height: 37px;
        transition-property: width, height;
        transition-duration: 0.3s;
        transition-timing-function: ease-in;
      }
    }
  }

  .userData {
    div {
      margin-top: 10px;
    }

    .userName {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22px;
    }

    .hiddenContainer {
      position: absolute;
      left: 30%;
      margin-top: 5px;
      width: 40%;
      height: 45px;
    }

    .dDay {
      font-size: 36px;
      margin-bottom: 50px;
    }
  }
`;

const WorkingState = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;

  .belowButton {
    width: 50%;
    height: 50px;
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.5);
    outline: none;
    border: none;
    border-left: 1px solid #ffffff;
    cursor: pointer;
    font-size: 15px;

    :hover {
      color: #0000ff;
      background-color: rgba(255, 255, 255, 1);
    }
  }
`;

const StateChangeButton = styled.button`
  display: inline-block;
  align-items: center;
  width: 10px;
  height: 20px;
  color: #ffffff;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 15px;
`;

const HiddenButton = styled.button`
  display: ${(props) => (props.hiddenState ? "block" : "none")};
  width: 100%;
  height: 45px;
  font-size: 15px;
  color: #000000;
  background-color: #ffffff;
  outline: none;
  border: none;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  :hover {
    color: #0000ff;
    background-color: rgba(255, 255, 255, 1);
  }
`;
