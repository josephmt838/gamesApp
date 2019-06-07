import React from "react";
import Card from "../../components/Card";
import { FaArrowCircleLeft } from "react-icons/fa";

const WrongPage = () => {
  return (
    <div className="wrong-page">
      <Card link="/">
        <FaArrowCircleLeft size="6rem" />
        <h1>Go Back</h1>
      </Card>
    </div>
  );
};

export default WrongPage;
