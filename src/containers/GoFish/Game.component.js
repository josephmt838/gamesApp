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
  givePlayerPoints
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
      hasToDraw: false
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
      currentRotation
    } = state;
    // check for a card pick and player pick to run hasMatch
    if (cardsDisabled && pickedOpponent && cardPick) {
      const match = hasMatch(players, cardPick, pickedOpponent, currentPlayer);

      if (match.hasMatch) {
        const { matches } = match;
        const currPlayerId = players[currentRotation.indexOf(currentPlayer)].id;
        const removeCurr = removeCardFromHand(
          currPlayerId,
          matches[1],
          players
        );
        console.log(removeCurr);
        console.log(pickedOpponent);
        const removeOpponent = removeCardFromHand(
          pickedOpponent,
          matches[0],
          removeCurr
        );
        console.log(removeOpponent);

        return {
          cardsDisabled: false,
          players: removeOpponent
        };
      } else {
        return {
          cardsDisabled: false,
          hasToDraw: true
        };
      }
    }
    return state;
  }
  selectCard = (e) => this.setState({ cardPick: e, cardsDisabled: true });
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
    this.setState({
      players: newHandAndDeck.players,
      remainingCards: newHandAndDeck.deck
    });
  };
  render() {
    const {
      cardsDealt,
      players,
      cardsDisabled,
      currentPlayer,
      pickedOpponent,
      hasToDraw
    } = this.state;
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
                  const match = hasHandMatch(p.hand);
                  console.log(match);
                  if (match && match.matches.length === 2) {
                    setTimeout(() => {
                      let newPlayers = givePlayerPoints(p.id, players);
                      match.matches.map((card) => {
                        newPlayers = removeCardFromHand(
                          p.id,
                          card.title,
                          players
                        );
                        this.setState({ ...newPlayers });
                      });
                    }, 1000);
                  }
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
            <button
              className={hasToDraw ? "draw-only" : "no-draw"}
              onClick={hasToDraw ? this.drawCard : null}
            >
              Draw Card
            </button>
          </section>
        )}
      </Fragment>
    );
  }
}

Game.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired
};
