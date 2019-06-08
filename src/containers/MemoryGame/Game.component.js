import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import Card from "../../components/Card/Card.component";
import GameNav from "../../components/GameNav";
import helpers from "../../helpers";
const { initializeDeck } = helpers;

const Game = ({ gameLevel, cardConfig, setGameStarted, username }) => {
  const { cardCategory, cardBack } = cardConfig;
  const [flipped, setFlipped] = useState([]);
  const [cards, setCards] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState("Keep Going!!!");
  const [startTime, setStartTime] = useState(null);
  const [resultTime, setResultTime] = useState("");

  useEffect(() => {
    setStartTime(Date.now());
    setCards(initializeDeck(gameLevel, cardCategory));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameLevel]);
  const getRercordTime = (endTime) => {
    let time = (endTime - startTime) / 1000;
    if (time > 60) {
      let min = Math.floor(time / 60);
      let sec = Math.round((time / 60 - min) * 100) + " seconds";
      min = min + (min > 1) ? "1 minute" : " minutes";
      time = min + sec;
    } else {
      time = time.toFixed(2) + " seconds";
    }
    setResultTime(time);
  };
  const handleClick = (id) => {
    if (flipped && flipped.length === 0) {
      setFlipped([id]);
    }
    if (flipped && flipped.length >= 1) {
      if (flipped.includes(id)) return;
      setFlipped([...flipped, id]);
      setDisabled(true);
      if (isMatch(id)) {
        return isMatch(id);
      }
    }
  };
  const isMatch = (id) => {
    if (cards[id].type.type === cards[flipped[0]].type.type) {
      const newPoints = points + 1;
      setMessage(`\u{1F44D} Great Job!!!! \u{1F44D}`);
      setPoints(newPoints);
      setSolved([...solved, ...flipped, id]);
      setTimeout(() => {
        resetCards();
        setMessage("");
      }, 500);
      if (newPoints === cards.length / 2) {
        getRercordTime(Date.now());
      }
    } else {
      setMessage(`\u{1F626} Try Again... \u{1F626}`);
      setTimeout(resetCards, 500);
    }
  };
  const resetCards = () => {
    setFlipped([]);
    setDisabled(false);
    setMessage("Keep Going!!!");
  };
  return (
    <Fragment>
      <GameNav
        points={points}
        message={message || resultTime}
        username={username}
      />
      <div className="memory-game-cards">
        {cards &&
          cards.length &&
          cards.map((card) => {
            const { id } = card;
            return (
              <Card
                key={`${id}-${cards[id].type.type}`}
                id={id}
                width={"90%"}
                height={"60%"}
                back={`./assets/MemoryGame/cardLists/${cardCategory}/${cardBack}`}
                front={`./assets/MemoryGame/cardLists/${cardCategory}/${
                  cards[id].type.type
                }.svg`}
                flipped={flipped.includes(id)}
                handleClick={handleClick}
                disabled={disabled}
                title={cards[id].type.type}
                solved={solved.includes(id)}
              />
            );
          })}
      </div>
      <button onClick={() => setGameStarted(false)}>Start New Game</button>
    </Fragment>
  );
};

Game.propTypes = {
  gameLevel: PropTypes.number.isRequired
};

export default Game;
