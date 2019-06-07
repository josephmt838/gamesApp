import React, { Fragment } from "react";
import { FaQuestion } from "react-icons/fa";

// import components
import GameBoard from "../../components/GameBoard";
import Card from "../../components/Card";

const GamesMenu = () => {
  return (
    <Fragment>
      <GameBoard>
        <Card link="/memorygame">
          <FaQuestion size="4rem" />
          <h3>Memory Game</h3>
        </Card>
      </GameBoard>
    </Fragment>
  );
};

export default GamesMenu;
