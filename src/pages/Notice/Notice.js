import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../../config";
import axios from "axios";
import Pagination from "react-js-pagination";
import NoticeList from "./NoticeList";
import "./Notice.scss";

const Notice = () => {
  const [listMock, setlistMock] = useState([]);
  const [activePage, setactivePage] = useState(1);
  const [inputValue, setinputValue] = useState([]);
  const [inputMock, setinputMock] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/notice/list`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then((res) => setlistMock(res.data));
  }, []);

  const handlePageChange = (pageNumber) => {
    axios
      .get(`${API}/notice/list?offset=${(pageNumber - 1) * 5}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then((res) => {
        setlistMock(res.data);
        setinputMock(res.data);
      });
    setactivePage(pageNumber);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchChange();
    }
  };

  const searchChange = () => {
    axios
      .get(`${API}/notice/list?search=${inputValue}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then((res) => {
        setlistMock(res.data);
      });
  };

  return (
    <>
      <div className="notice">
        <div className="noticeTitle">
          <span>Notice</span>
        </div>
        <div className="noticeCenter">
          <div className="searchDiv">
            <div className="search">
              <span>
                <i class="xi-search"></i>
              </span>
              <input
                onChange={(e) => setinputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                name="search"
                type="search"
                placeholder="검색어를 입력하세요"
                value={inputValue}
              />
            </div>
            <div className="writing">
              <Link to="/NoticeWriting">글쓰기</Link>
            </div>
          </div>
          <div className="listTitle">
            <div className="listTitleDiv">
              <span>NO</span>
              <span>목록</span>
              <span>Date</span>
            </div>
            <div className="line"></div>
          </div>
          <div>
            <NoticeList listMock={listMock} />
            <Pagination
              activePage={activePage}
              itemsCountPerPage={5}
              totalItemsCount={listMock.total_notices}
              pageRangeDisplayed={5}
              hideFirstLastPages
              itemClassPrev={"prevPageText"}
              itemClassNext={"nextPageText"}
              prevPageText={"<"}
              nextPageText={">"}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Notice;
