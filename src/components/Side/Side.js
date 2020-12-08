import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Calendar from "../../components/Side/components/react-calendar/src/Calendar";
import { useCookies } from "react-cookie";
import axios from "axios";
import { BsPlus } from "react-icons/bs";
import { API } from "../../config";
import "./Side.scss";

const stateName = ["근무 중", "식사", "휴식"];

const Side = () => {
  const [value, onChange] = useState(() => new Date());
  const [hiddenState, setHiddenState] = useState(false);
  const [userState, setUserState] = useState("근무 중");
  const [userData, setuserData] = useState([]);

  const [onWorking, setOnWorking] = useState(false);
  const [persistState, setPersistState] = useState(null);

  const [profilePhoto, setProfilePhoto] = useState(
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80"
  );

  const [workingToken, setWorkingToken, removeWorkingToken] = useCookies([
    "working_token"
  ]);
  const [workingHoursCookies, setWorkingHoursCookies] = useCookies([
    "working_hours"
  ]);
  const [
    startTimeCookies,
    setStartTimeCookies,
    removeStartTimeCookies
  ] = useCookies(["start_time"]);
  const [
    pauseTimeCookies,
    setPauseTimeCookies,
    removePauseTimeCookies
  ] = useCookies(["pause_time"]);
  const [
    reStartTimeCookies,
    setReStartTimeCookies,
    removeReStartTimeCookies
  ] = useCookies(["restart_time"]);
  const [finishTimeCookies, setFinishTimeCookies] = useCookies(["finish_time"]);

  const showingButton = () => {
    setHiddenState(!hiddenState);
  };

  const interval = useRef();

  const timer = () => {
    if (!startTimeCookies.start_time) {
      setStartTimeCookies("start_time", Date.now());
      setOnWorking(true);
      setWorkingToken("working_token", "onWorking");
    } else if (startTimeCookies.start_time && reStartTimeCookies.restart_time) {
      let preCal =
        reStartTimeCookies.restart_time - pauseTimeCookies.pause_time;
      setStartTimeCookies(
        "start_time",
        Number(startTimeCookies.start_time) + preCal
      );
      removeReStartTimeCookies("restart_time");
      setPersistState(false);
    }
    setWorkingHoursCookies(
      "working_hours",
      new Date(Date.now() - startTimeCookies.start_time)
    );
  };

  useEffect(() => {
    if (workingToken.working_token) {
      interval.current = setInterval(() => timer(), 1000);
      setOnWorking(true);
    }
    return () => clearInterval(interval.current);
  }, [onWorking, persistState]);

  const resumeTimer = (e) => {
    if (new Date(workingHoursCookies.working_hours).getTime() > 0) {
      setUserState(e.target.value);
      setOnWorking(true);
      setPersistState(true);
      setWorkingToken("working_token", "onWorking");
      setReStartTimeCookies("restart_time", Date.now());
    }
  };

  const stopTimer = (e) => {
    if (new Date(workingHoursCookies.working_hours).getTime() > 0) {
      setUserState(e.target.value);
      setOnWorking(false);
      removeWorkingToken("working_token");
      setPauseTimeCookies("pause_time", Date.now());
      clearTimeout(interval.current);
    }
  };

  const finishTimer = () => {
    setOnWorking(false);
    removeWorkingToken("working_token");
    setWorkingHoursCookies("working_hours", new Date(0));
    setFinishTimeCookies("finish_time", Date.now());

    removeStartTimeCookies("start_time");
    removePauseTimeCookies("pause_time");
    removeReStartTimeCookies("restart_time");
    clearTimeout(interval.current);
  };

  const photoUpload = (e) => {
    const formdata = new FormData();
    formdata.append("attachment", e.target.files[0]);

    axios
      .patch(`${API}/employee/profile/image`, formdata, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => {
        console.log("데이터 성공");
      })
      .catch((response) => {
        console.log("error >>>>", response.response);
      });
  };

  return (
    <SideBarContainer>
      <Profile>
        <div className="profileContainer">
          <img
            src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80"
            alt="프로필 이미지 입니다."
          />
          <label for="profilePhoto">
            <BsPlus className="plusButton" />
          </label>
          <input
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            id="profilePhoto"
            onClick={(e) => photoUpload(e)}
            style={{ display: "none" }}
          />
        </div>
        <div className="userData">
          <div className="userState">{userState}</div>
          <div className="userName">
            {userData.name}
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
          <div className="dDay">D +{userData.joined_since}</div>
        </div>
        <div>
          {new Date(workingHoursCookies.working_hours).getHours() - 9}시간{" "}
          {new Date(workingHoursCookies.working_hours).getMinutes()}분{" "}
          {new Date(workingHoursCookies.working_hours).getSeconds()}초
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
`;

const Profile = styled.div`
  margin: 80px 0px 70px 0px;
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
      cursor: pointer;

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
  bottom: 0px;
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
