import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import actions from "../../assets/cardActions";
import PlayersHand from "../../components/PlayersHand/PlayersHand.component";

const {
  shuffleCards,
  dealCards,
  pickPlayer,
  hasMatch,
  getSingleCpuId,
  drawCard,
  hasHandMatch,
  removeCardFromHand,
  givePlayerPoints,
  nextPlayer,
  getWinner
} = actions;

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardsDealt: false,
      players: [
        {
          id: 1,
          hand: [],
          points: 0,
          type: "human"
        },
        {
          id: 2,
          hand: [],
          points: 0,
          type: "cpu"
        }
      ],
      currentRotation: [],
      cardsPlayed: [],
      currentPlayer: 0,
      remainingCards: [],
      cardPick: "",
      cardsDisabled: false,
      pickedOpponent: null,
      hasToDraw: false,
      previousCurrentPlayer: null,
      hasWinner: false,
      winningPlayer: "",
      opponentCard: ""
    };
  }
  componentDidMount() {
    const { cards } = this.props;
    const { players, currentPlayer } = this.state;
    const newCards = shuffleCards(cards, 5);
    const deckToDeal = dealCards(players, newCards);
    const playerRotation = deckToDeal.players.map((p) => p.id);
    // set the deck of cards to be used
    if (cards && cards.length) {
      this.setState({
        players: deckToDeal.players,
        remainingCards: deckToDeal.deck,
        currentRotation: playerRotation,
        currentPlayer: playerRotation[0]
      });
    }
    // check if only two players
    if (players && players.length === 2) {
      const currPlayerId = playerRotation[currentPlayer];
      const pickedOpponent = getSingleCpuId(players, currPlayerId);
      this.setState({ pickedOpponent });
    }
  }
  static getDerivedStateFromProps(props, state) {
    const {
      cardsDisabled,
      pickedOpponent,
      cardPick,
      players,
      currentPlayer,
      currentRotation,
      cardsPlayed,
      cardsDealt
    } = state;
    let currPlayerId = players[currentRotation.indexOf(currentPlayer)];
    // check for a card pick and player pick to run hasMatch
    if (cardsDisabled && pickedOpponent && cardPick) {
      const match = hasMatch(players, cardPick, pickedOpponent, currentPlayer);

      if (match && match.hasMatch) {
        const { matches } = match;
        const points = givePlayerPoints(currPlayerId.id, players);
        const removeCurr = removeCardFromHand(
          currPlayerId.id,
          matches[1],
          points
        );
        console.log(removeCurr);
        const removeOpponent = removeCardFromHand(
          pickedOpponent,
          matches[0],
          removeCurr
        );
        console.log("Opponent has Card: ", matches);
        return {
          cardsDisabled: false,
          players: removeOpponent,
          cardsPlayed: [...cardsPlayed, ...matches],
          opponentCard: matches[0]
        };
      } else {
        console.log("draw a card");
        return {
          cardsDisabled: true,
          hasToDraw: true
        };
      }
    }

    return state;
  }
  selectCard = (e) =>
    this.setState({ cardPick: e, cardsDisabled: true, opponentCard: "" });
  pickPlayer = (e) => {
    const opponent = pickPlayer(e);
    return this.setState({ pickedOpponent: Number(opponent) });
  };
  drawCard = (e) => {
    const {
      currentPlayer,
      players,
      remainingCards,
      currentRotation
    } = this.state;
    e.preventDefault();

    const currPlayer = players[currentRotation.indexOf(currentPlayer)];
    const newHandAndDeck = drawCard(currPlayer.id, remainingCards, players);

    // get next player in rotation
    const next = nextPlayer(currentRotation, currentPlayer);

    this.setState({
      players: newHandAndDeck.players,
      remainingCards: newHandAndDeck.deck,
      cardsDisabled: true,
      cardPick: "",
      hasToDraw: false
    });
    setTimeout(() => {
      this.setState({
        currentPlayer: next.currentPlayer,
        pickedOpponent: currentPlayer
      });
    }, 1000);
  };
  isComputersTurn = () => {
    const {
      currentPlayer,
      currentRotation,
      pickedOpponent,
      players,
      cardsPlayed,
      remainingCards
    } = this.state;
    let currPlayerId = players[currentRotation.indexOf(currentPlayer)];
    if (currPlayerId && currPlayerId.id) {
      if (currPlayerId.type === "cpu") {
        const { hand } = currPlayerId;
        const random = Math.floor(Math.random() * hand.length);
        console.log("cpu turn");
        const pickCard = hand && hand.length ? hand[random].title : "";
        const match = hasMatch(
          players,
          pickCard,
          pickedOpponent,
          currentPlayer
        );
        console.log(pickCard, pickedOpponent, currentPlayer);
        console.log(match);
        if (match.hasMatch) {
          const { matches } = match;
          const points = givePlayerPoints(currPlayerId.id, players);
          const removeCurr = removeCardFromHand(
            currPlayerId.id,
            matches[1],
            points
          );
          const removeOpponent = removeCardFromHand(
            pickedOpponent,
            matches[0],
            removeCurr
          );
          console.log("CPU picked right", matches);
          return this.setState({
            players: removeOpponent,
            cardsDisabled: true,
            cardsPlayed: [...cardsPlayed, ...matches],
            opponentCard: matches[0],
            cardPick: pickCard
          });
        }
        const next = nextPlayer(currentRotation, currentPlayer);
        console.log(next);
        const newHand = drawCard(currPlayerId.id, remainingCards, players);
        console.log(newHand);
        console.log("CPU wrong pick", pickCard);
        return this.setState({
          cardPick: hand[random].title,
          cardsDisabled: false,
          players: newHand.players,
          remainingCards: newHand.deck,
          currentPlayer: next.currentPlayer,
          pickedOpponent: currentPlayer,
          opponentCard: ""
        });
      }
    }
  };
  hasHandMatch = (player, players) => {
    const { cardsPlayed } = this.state;
    const match = hasHandMatch(player.hand);
    if (match && match.matches.length === 2) {
      let newPlayers = givePlayerPoints(player.id, players);
      setTimeout(() => {
        let playedCards = [];
        match.matches.map((card) => {
          playedCards.push(card.title);
          newPlayers = removeCardFromHand(player.id, card.title, newPlayers);

          this.setState({
            players: [...newPlayers],
            cardsPlayed: [...cardsPlayed, ...playedCards]
          });
        });
      }, 1000);
    }
  };
  showCardPick = (cardPick) => {
    const { cards } = this.props;
    const filteredCard = cards.filter((card) => {
      if (card.title === cardPick) {
        return card;
      }
    });
    const cardImage = filteredCard;
    console.log(cardImage, "IMAGE *****");
    return (
      <Fragment>
        {cardImage && cardImage[0] && (
          <img
            src={`./assets/CardGame/cards/${cardImage &&
              cardImage[0] &&
              cardImage[0].image}`}
            alt={cardImage && cardImage}
          />
        )}
      </Fragment>
    );
  };
  render() {
    const {
      cardsDealt,
      players,
      cardsDisabled,
      currentPlayer,
      pickedOpponent,
      hasToDraw,
      currentRotation,
      cardPick,
      opponentCard,
      hasWinner
    } = this.state;
    let currPlayer = players[currentRotation.indexOf(currentPlayer)];

    if (currPlayer && currPlayer.type === "cpu") {
      setTimeout(this.isComputersTurn, 1000);
    }
    return (
      <Fragment>
        {cardsDisabled && !pickedOpponent && (
          <section>
            {players &&
              players.map((p) => {
                if (p.id === currentPlayer) return null;
                return (
                  <button onClick={(e) => this.pickPlayer(e)}>{p.id}</button>
                );
              })}
          </section>
        )}
        <section className="player-decks">
          {cardsDealt ? (
            <Fragment>
              {players &&
                players.length &&
                players.map((p) => {
                  this.hasHandMatch(p, players);
                  return (
                    <PlayersHand
                      player={p}
                      key={p.id}
                      selectCard={this.selectCard}
                      disabled={cardsDisabled}
                    />
                  );
                })}
            </Fragment>
          ) : (
            <button onClick={() => this.setState({ cardsDealt: !cardsDealt })}>
              Deal Cards
            </button>
          )}
        </section>
        {cardsDealt && (
          <Fragment>
            <section className="selected-cards">
              {cardPick ? (
                this.showCardPick(cardPick)
              ) : (
                <section className="blank-card" />
              )}
              {opponentCard ? (
                this.showCardPick(opponentCard)
              ) : (
                <section className="blank-card" />
              )}
            </section>
            <section
              className="remaining-deck"
              style={{
                padding: "5px 20px",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <img
                src="./assets/CardGame/cards/cardback.svg"
                alt="card deck"
                width={"100px"}
                height={"140px"}
              />
              {!hasWinner ? (
                <button
                  className={hasToDraw ? "draw-only" : "no-draw"}
                  onClick={hasToDraw ? this.drawCard : null}
                >
                  Draw Card
                </button>
              ) : (
                <button className="draw-only" onClick={this.resetGame}>
                  New Game
                </button>
              )}
            </section>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

Game.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired
};
