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

  useEffect(() => {
    axios.get(`${API}/notice/list`).then((res) => setlistMock(res.data));
  }, []);

  const handlePageChange = (pageNumber) => {
    axios
      .get(`${API}/notice/list?offset=${(pageNumber - 1) * 5}`)
      .then((res) => {
        setlistMock(res.data.notices);
      });
    setactivePage(pageNumber);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchChange();
    }
  };

  const searchChange = () => {
    axios.get(`${API}/notice/list?search=${inputValue}`).then((res) => {
      setlistMock(res.data);
      console.log(res.data);
    });
  };

  // useEffect(() => {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/posts?_page=1&_limit=5")
  //     .then((res) => setlistMock(res.data));
  // }, []);

  // const handlePageChange = (pageNumber) => {
  //   axios
  //     .get(
  //       `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=5`
  //     )
  //     .then((res) => {
  //       setlistMock(res.data);
  //     });

  //   setactivePage(pageNumber);
  // };

  console.log(inputValue);

  return (
    <>
      <div className="nav">NAV</div>
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
              <Link>글쓰기</Link>
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
            <NoticeList
              listMock={listMock}
              /*listMock={listMock.filter(
                (data) => data.title.toLowerCase().indexOf(inputValue) !== -1
              )}*/
            />
            <Pagination
              activePage={activePage}
              itemsCountPerPage={5}
              totalItemsCount={Math.ceil(listMock.total_notices)}
              pageRangeDisplayed={Math.ceil(listMock.total_notices / 5)}
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
