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

    console.log(fullAddress);
  };

  return <DaumPostcode onComplete={handleComplete} />;
};

export default Postcode;
