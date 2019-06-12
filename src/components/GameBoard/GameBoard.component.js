import React from "react";
import PropTypes from "prop-types";

import "./GameBoard.scss";

const GameBoard = ({ children, classes }) => {
  return (
    <section
      className={`game-board ${classes ? classes : ""}`}
      data-testid={"classes"}
    >
      {children}
    </section>
  );
};

GameBoard.propTypes = {
  childre: PropTypes.node,
  classes: PropTypes.string
};

export default GameBoard;
