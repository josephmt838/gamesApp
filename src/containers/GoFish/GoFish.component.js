import React, { Component, Fragment } from "react";
import cards from "../../assets/cards/playingcards";

import GameBoard from "../../components/GameBoard";
import RulesList from "../../components/RulesList";
import Game from "./Game.component";
import "./GoFish.scss";

export default class GoFish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCard: "2_of_hearts.svg",
      gameStarted: false
    };
  }

  render() {
    const { gameStarted } = this.state;
    return (
      <GameBoard classes={"gofish-board"}>
        {/* <img
          src={`./assets/cards/playingcards/${
            cards[Math.floor(Math.random() * cards.length)].image
          }`}
        /> */}
        {!gameStarted ? (
          <RulesList>
            <h3>Go Fish Game Rules</h3>
            <ul>
              <li>Pick a player to ask for a card</li>
              <li>If that player has the card you ask for go again</li>
              <li>If not, draw a card</li>
              <li>First player with no cards left wins</li>
            </ul>
            <button onClick={() => this.setState({ gameStarted: true })}>
              Go to game
            </button>
          </RulesList>
        ) : (
          <Fragment>
            <Game cards={cards} />
          </Fragment>
        )}
      </GameBoard>
    );
  }
}
