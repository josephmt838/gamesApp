import React from "react";
import PropTypes from "prop-types";

import "./GameBoard.scss";

const GameBoard = ({ children }) => {
  return <section className="game-board">{children}</section>;
};

GameBoard.propTypes = {
  childre: PropTypes.node
};

export default GameBoard;
