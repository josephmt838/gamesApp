import React, { useState } from "react";
import { Link } from "react-router-dom";

import GameBoard from "../../components/GameBoard";
import RulesList from "../../components/RulesList";
import Game from "./Game.component";

import "./MemoryGame.scss";

const MemoryGame = (props) => {
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <GameBoard>
      {gameStarted ? (
        <Game gameLevel={5} />
      ) : (
        <RulesList gameStarted={gameStarted}>
          <h1>Memory Game Rules</h1>
          <ul>
            <li>Pick Two Cards</li>
            <li>Get points for both cards matching</li>
            <li>Game is over when all cards are gone</li>
          </ul>
          <button>
            <Link to="/">Go Back</Link>
          </button>
          <button onClick={() => setGameStarted(true)}>Start Game</button>
        </RulesList>
      )}
    </GameBoard>
  );
};

MemoryGame.propTypes = {};

export default MemoryGame;
