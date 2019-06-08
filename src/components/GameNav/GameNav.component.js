import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./GameNav.scss";

const GameNav = ({ points, message, username }) => {
  return (
    <nav className="game-nav">
      <p className="user-tag">User: {username}</p>
      <h1 className="message">{message && message}</h1>
      <p className="points">
        Points: <strong>{points && points}</strong>
      </p>
    </nav>
  );
};

GameNav.propTypes = {
  points: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired
};

export default GameNav;
