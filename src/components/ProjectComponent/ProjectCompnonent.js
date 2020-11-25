import React, { useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import "./ProjectComponent.scss";

const ProjectComponet = ({
  title,
  member,
  description,
  start_date,
  end_date
}) => {
  const [bookmark, setBookmark] = useState(false);

  const handleBookmark = () => {
    setBookmark(!bookmark);
  };

  return (
    <div className="gridProjectComponent">
      <div className="projectContent">
        <h3>{title}sadasdasdasdasdsadasdsadasdasdasd</h3>
      </div>
      <div className="projectContentContainer">
        <div className="projectDescription">
          {description}- 이 기능은 인사 인트라넷이 아닌 ACG 인트라넷을 참고하여
          만들어서 기능 관련해서는 대표님께 여쭤봐주시기 바랍니다! 제가 생각한
          기능과 다를 수가 있어서요! - SMS 자주 쓰는 메세지는 최대 6개 박스가
          디폴트, 우측에 편집 버튼을 누르면 각 박스 안에 내용을 수정하는 버튼이
          생성되고 메세지를 수정할 수 있도록하면 어떨까 해서 디자인했어요 더
          효율적이거나 괜찮은 방식이 있다면 언제든지 말씀해주세요! 적어 놓은
          메세지는 보낼 내용 부분에 복사 붙여넣기 할 수 있도록 텍스트 박스
          형식으로 구현하면 어떨까 합니다~ 설명이 부족하면 말씀해주세요. -
          핸드폰 시안에 번호 추가 버튼을 클릭하면 팝업이 뜨고 그 팝업 안에서
          번호를 적고 +버튼으로 추가하면 밑 박스에 추가되는 방식입니다. 자주
          쓰는 번호는 자주 쓰는 메세지와 같은 방식으로 비슷하게 디자인했어요!
          다만 다른 점은 복사 붙여넣기가 아니라 만들어 놓은 박스를 클릭하면 위
          박스에 번호가 추가될 수 있도록 구현되면 좋겠습니다! 그리고 우측에 편집
          버튼을 누르면 저장해놓을 이름과 번호를 쓸 수 있도록 하면 어떨까
          합니다! 이것 또한 설명이 부족하면 말씀해주세요ㅠㅠ최대한 간단하게
          만들어보려고 했는데 어떨지 모르겠네요. 일단 자주 쓰는 번호도 최대
          6개까지만 만들어 두면 좋을 것 같아요.
        </div>
        <div className="projectPeriod">
          <span>
            {start_date} ~ {end_date}
          </span>
        </div>
      </div>
      <div className="projectFooter">
        <p>{member}명 참여중</p>
        <div className="bookmarkIcon" onClick={handleBookmark}>
          {bookmark ? (
            <BsBookmarkFill className="bookmarkFillIcon" />
          ) : (
            <BsBookmark className="bookmarkIcon" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectComponet;
