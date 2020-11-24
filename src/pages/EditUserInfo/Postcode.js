import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import "./Postcode.scss";

const Postcode = () => {
  const [isAddress, setIsAddress] = useState("");
  const [isZoneCode, setIsZoneCode] = useState();
  const [isPostOpen, setIsPostOpen] = useState(true);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setIsZoneCode(data.zonecode);
    setIsAddress(fullAddress);
    setIsPostOpen(false);
  };
  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "50%",
    width: "400px",
    height: "500px",
    padding: "7px"
  };

  return (
    <div className="postcode">
      <DaumPostcode style={postCodeStyle} onComplete={handleComplete} />
    </div>
  );
};

export default Postcode;
