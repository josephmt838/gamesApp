import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import helpers from "../../helpers";
import GameBoard from "../../components/GameBoard";
import RulesList from "../../components/RulesList";
import Game from "./Game.component";

import "./MemoryGame.scss";
const { checkGameStart } = helpers;
const MemoryGame = (props) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [cardBack, setCardBack] = useState("pokemon.svg");
  const [cardCategory, setCardCategory] = useState("pokemon");
  const [cardCredits, setCardCredits] = useState("");
  const [username, setUserName] = useState("");
  return (
    <GameBoard>
      {gameStarted ? (
        <Game
          gameLevel={5}
          cardConfig={{ cardCategory, cardCredits, cardBack }}
          setGameStarted={setGameStarted}
          username={username}
        />
      ) : (
        <RulesList gameStarted={gameStarted}>
          <h3>Memory Game Rules</h3>
          <ul>
            <li>Pick Two Cards</li>
            <li>Get points for both cards matching</li>
            <li>Game is over when all cards are gone</li>
          </ul>
          <section className="game-config">
            <section>
              <h3>Select your card set</h3>
              <select
                className="category-select"
                value={cardCategory}
                onChange={(e) => {
                  const category = e.target.value;
                  setCardCategory(category);
                  setCardBack(`${category}.svg`);
                  setCardCredits(
                    `./assets/MemoryGame/cardLists/${category}/credits.js`
                  );
                }}
              >
                <option value="" />
                <option value="pokemon">Pokemon</option>
                <option value="beach">Beach Fun</option>
                <option value="foods">Foods</option>
              </select>
            </section>
            <section>
              <h3>Enter your name</h3>
              <input
                className="username"
                type="text"
                value={username}
                placeholder="Enter your name..."
                onChange={(e) => setUserName(e.target.value)}
              />
            </section>
          </section>
          <section className="game-btns">
            <Link to="/">Go Back</Link>
            <button
              onClick={() =>
                checkGameStart(username, cardCategory) && setGameStarted(true)
              }
            >
              Start Game
            </button>
          </section>
        </RulesList>
      )}
    </GameBoard>
  );
};

MemoryGame.propTypes = {};

export default MemoryGame;
