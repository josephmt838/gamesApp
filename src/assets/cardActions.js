// const cards = [
//   {
//     title: "2 of Spades",
//     image: "2_of_spades.svg"
//   },
//   {
//     title: "3 of Spades",
//     image: "3_of_spades.svg"
//   },
//   {
//     title: "4 of Spades",
//     image: "4_of_spades.svg"
//   },
//   {
//     title: "5 of Spades",
//     image: "5_of_spades.svg"
//   },
//   {
//     title: "6 of Spades",
//     image: "6_of_spades.svg"
//   },
//   {
//     title: "7 of Spades",
//     image: "7_of_spades.svg"
//   },
//   {
//     title: "8 of Spades",
//     image: "8_of_spades.svg"
//   },
//   {
//     title: "9 of Spades",
//     image: "9_of_spades.svg"
//   },
//   {
//     title: "10 of Spades",
//     image: "10_of_spades.svg"
//   },
//   {
//     title: "Jack of Spades",
//     image: "jack_of_spades.svg"
//   },
//   {
//     title: "Queen of Spades",
//     image: "queen_of_spades.svg"
//   },
//   {
//     title: "King of Spades",
//     image: "king_of_spades.svg"
//   },
//   {
//     title: "Ace of Spades",
//     image: "ace_of_spades.svg"
//   },
//   {
//     title: "2 of Clubs",
//     image: "2_of_clubs.svg"
//   },
//   {
//     title: "3 of Clubs",
//     image: "3_of_clubs.svg"
//   },
//   {
//     title: "4 of Clubs",
//     image: "4_of_clubs.svg"
//   },
//   {
//     title: "5 of Clubs",
//     image: "5_of_clubs.svg"
//   },
//   {
//     title: "6 of Clubs",
//     image: "6_of_clubs.svg"
//   },
//   {
//     title: "7 of Clubs",
//     image: "7_of_clubs.svg"
//   },
//   {
//     title: "8 of Clubs",
//     image: "8_of_clubs.svg"
//   },
//   {
//     title: "9 of Clubs",
//     image: "9_of_clubs.svg"
//   },
//   {
//     title: "10 of Clubs",
//     image: "10_of_clubs.svg"
//   },
//   {
//     title: "Jack of Clubs",
//     image: "jack_of_clubs.svg"
//   },
//   {
//     title: "Queen of Clubs",
//     image: "queen_of_clubs.svg"
//   },
//   {
//     title: "King of Clubs",
//     image: "king_of_clubs.svg"
//   },
//   {
//     title: "Ace of Clubs",
//     image: "ace_of_clubs.svg"
//   },
//   {
//     title: "2 of Hearts",
//     image: "2_of_hearts.svg"
//   },
//   {
//     title: "3 of Hearts",
//     image: "3_of_hearts.svg"
//   },
//   {
//     title: "4 of Hearts",
//     image: "4_of_hearts.svg"
//   },
//   {
//     title: "5 of Hearts",
//     image: "5_of_hearts.svg"
//   },
//   {
//     title: "6 of Hearts",
//     image: "6_of_hearts.svg"
//   },
//   {
//     title: "7 of Hearts",
//     image: "7_of_hearts.svg"
//   },
//   {
//     title: "8 of Hearts",
//     image: "8_of_hearts.svg"
//   },
//   {
//     title: "9 of Hearts",
//     image: "9_of_hearts.svg"
//   },
//   {
//     title: "10 of Hearts",
//     image: "10_of_hearts.svg"
//   },
//   {
//     title: "Jack of Hearts",
//     image: "jack_of_hearts.svg"
//   },
//   {
//     title: "Queen of Hearts",
//     image: "queen_of_hearts.svg"
//   },
//   {
//     title: "King of Hearts",
//     image: "king_of_hearts.svg"
//   },
//   {
//     title: "Ace of Hearts",
//     image: "ace_of_hearts.svg"
//   },
//   {
//     title: "2 of Diamonds",
//     image: "2_of_diamonds.svg"
//   },
//   {
//     title: "3 of Diamonds",
//     image: "3_of_diamonds.svg"
//   },
//   {
//     title: "4 of Diamonds",
//     image: "4_of_diamonds.svg"
//   },
//   {
//     title: "5 of Diamonds",
//     image: "5_of_diamonds.svg"
//   },
//   {
//     title: "6 of Diamonds",
//     image: "6_of_diamonds.svg"
//   },
//   {
//     title: "7 of Diamonds",
//     image: "7_of_diamonds.svg"
//   },
//   {
//     title: "8 of Diamonds",
//     image: "8_of_diamonds.svg"
//   },
//   {
//     title: "9 of Diamonds",
//     image: "9_of_diamonds.svg"
//   },
//   {
//     title: "10 of Diamonds",
//     image: "10_of_diamonds.svg"
//   },
//   {
//     title: "Jack of Diamonds",
//     image: "jack_of_diamonds.svg"
//   },
//   {
//     title: "Queen of Diamonds",
//     image: "queen_of_diamonds.svg"
//   },
//   {
//     title: "King of Diamonds",
//     image: "king_of_diamonds.svg"
//   },
//   {
//     title: "Ace of Diamonds",
//     image: "ace_of_diamonds.svg"
//   }
// ];
// const players = [
//   {
//     id: 1,
//     hand: [],
//     points: 0,
//     type: "human"
//   },
//   {
//     id: 2,
//     hand: [],
//     points: 0,
//     type: "cpu"
//   },
//   {
//     id: 3,
//     hand: [],
//     points: 0,
//     type: "cpu"
//   }
// ];
// const playerRotation = [2, 3, 1];
// const currentPlayer = 1;
// const askedCard = "king_of_diamonds.svg";
// const playerAsked = 2;
const actions = {
  shuffleCards: (deck, rounds) => {
    let i = 0;
    let newDeck = [...deck];
    const deckLength = newDeck.length;
    while (rounds >= 0) {
      while (i <= deckLength - 1) {
        const random = Math.floor(Math.random() * deckLength);
        let temp = newDeck[i];
        newDeck[i] = newDeck[random];
        newDeck[random] = temp;
        i++;
      }
      rounds--;
    }
    return newDeck;
  },
  dealCards: (players, deck) => {
    let newDeck = [...deck];
    if (players && players.length) {
      let rounds = 5;
      // deal 5 cards to each player
      while (rounds > 0) {
        players.forEach((player) => {
          player.hand.push(newDeck[newDeck.length - 1]);
          newDeck.splice(newDeck.length - 1, 1);
        });
        rounds--;
      }
    }
    return { players: [...players], deck: newDeck };
  },
  drawCard: (playerId, deck, players) => {
    players.forEach((player) => {
      if (player.id === playerId) {
        player.hand = [...player.hand, deck[deck.length - 1]];
        deck.splice(deck.length - 1, 1);
      }
      //   console.log(player.hand);
    });
    return { players, deck };
  },
  pickPlayer: (playerToPick) => {
    const id = playerToPick.target.innerHTML;
    return id;
  },
  removeCardFromHand: (playerId, cardTitle, players) => {
    players.map((player) => {
      if (playerId === player.id) {
        player.hand.map((card, i) =>
          card.title === cardTitle ? player.hand.splice(i, 1) : false
        );
        return player;
      }
      return player;
    });
    return players;
  },
  givePlayerPoints: (playerId, players) => {
    players.map((p) => {
      if (p.id === playerId) {
        p.points = p.points + 1;
      }
      return p;
    });
    return players;
  },
  hasMatch: (players, askedCard, playerAsked, currentPlayer) => {
    let hasMatch = false;
    let matches = [];
    players.forEach((p) => {
      if (p.id === playerAsked) {
        p.hand.map((opponentCard) => {
          if (opponentCard.image.charAt(0) === askedCard.charAt(0)) {
            hasMatch = true;
            matches = [opponentCard.title, askedCard];
            return hasMatch;
          }
          return hasMatch;
        });
      }
    });
    return { hasMatch, matches };
  },
  nextPlayer: (playerRotation, currentPlayer) => {
    const indexOfCurrentPlayer = playerRotation.indexOf(currentPlayer);
    let currPlayer;
    if (indexOfCurrentPlayer !== -1) {
      if (indexOfCurrentPlayer === playerRotation.length - 1) {
        currPlayer = 0;
      } else {
        currPlayer = indexOfCurrentPlayer + 1;
      }
    }
    return { currentPlayer: currPlayer };
  },
  getWinner: (players) => {
    let winner;
    players.map((player) => {
      if (player.hand && player.hand.length === 0) {
        winner = player.id;
        return winner;
      } else return (winner = -1);
    });
    return winner;
  },
  getHandLength: (playerId, players) => {
    let handLength = 0;
    players.map((p) => {
      if (p.id === playerId) {
        handLength = p.hand.length;
        return handLength;
      }
      handLength = -1;
      return handLength;
    });
    return handLength;
  },
  getSingleCpuId: (players, currentPlayer) => {
    let opponent = players.filter((p) => p.id !== currentPlayer);
    opponent = opponent[0];
    return opponent.id;
  },
  hasHandMatch: (hand) => {
    let cardArr = [];
    let hasHandMatch = false;
    let matches = [];
    hand.map((card) => cardArr.push(card.image.charAt(0)));
    cardArr.map((card, i) => {
      for (let j in hand) {
        if (card === cardArr[j] && i != j) {
          hasHandMatch = true;
          matches = [hand[i], hand[j]];
          continue;
        }
      }
    });
    return { hasHandMatch, matches };
  }
};
// shuffle cards
// console.log("Round *******", actions.shuffleCards(cards, 5), "End ROund ****");
// deal a hand of cards for go fish
// actions.dealCards(players, cards);
// console.log(players[1]);
// console.log(actions.removeCardFromHand(2, "King of Diamonds", players));
// actions.givePlayerPoints(1, players);
// console.log(players);
// console.log(cards);
// console.log(actions.nextPlayer(currentPlayer, playerRotation));
// console.log(actions.getCurrentPlayer());
// console.log(actions.getWinner(players));
// console.log(actions.getHandLength(5, players));
// console.log(actions.hasMatch(players, askedCard, playerAsked, currentPlayer));
// draw a single card
// console.log(actions.drawCard(1, cards, players));
export default actions;
