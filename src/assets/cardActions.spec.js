import actions from "./cardActions";

const {
  drawCard,
  dealCards,
  shuffleCards,
  removeCardFromHand,
  givePlayerPoints,
  hasMatch,
  nextPlayer,
  getWinner,
  getHandLength,
  hasHandMatch
} = actions;

const cards = [
  {
    title: "2 of Spades",
    image: "2_of_spades.svg"
  },
  {
    title: "3 of Spades",
    image: "3_of_spades.svg"
  },
  {
    title: "4 of Spades",
    image: "4_of_spades.svg"
  },
  {
    title: "5 of Spades",
    image: "5_of_spades.svg"
  },
  {
    title: "6 of Spades",
    image: "6_of_spades.svg"
  },
  {
    title: "7 of Spades",
    image: "7_of_spades.svg"
  },
  {
    title: "8 of Spades",
    image: "8_of_spades.svg"
  },
  {
    title: "9 of Spades",
    image: "9_of_spades.svg"
  },
  {
    title: "10 of Spades",
    image: "10_of_spades.svg"
  },
  {
    title: "Jack of Spades",
    image: "jack_of_spades.svg"
  },
  {
    title: "Queen of Spades",
    image: "queen_of_spades.svg"
  },
  {
    title: "King of Spades",
    image: "king_of_spades.svg"
  },
  {
    title: "Ace of Spades",
    image: "ace_of_spades.svg"
  },
  {
    title: "2 of Clubs",
    image: "2_of_clubs.svg"
  },
  {
    title: "3 of Clubs",
    image: "3_of_clubs.svg"
  },
  {
    title: "4 of Clubs",
    image: "4_of_clubs.svg"
  },
  {
    title: "5 of Clubs",
    image: "5_of_clubs.svg"
  },
  {
    title: "6 of Clubs",
    image: "6_of_clubs.svg"
  },
  {
    title: "7 of Clubs",
    image: "7_of_clubs.svg"
  },
  {
    title: "8 of Clubs",
    image: "8_of_clubs.svg"
  },
  {
    title: "9 of Clubs",
    image: "9_of_clubs.svg"
  },
  {
    title: "10 of Clubs",
    image: "10_of_clubs.svg"
  },
  {
    title: "Jack of Clubs",
    image: "jack_of_clubs.svg"
  },
  {
    title: "Queen of Clubs",
    image: "queen_of_clubs.svg"
  },
  {
    title: "King of Clubs",
    image: "king_of_clubs.svg"
  },
  {
    title: "Ace of Clubs",
    image: "ace_of_clubs.svg"
  },
  {
    title: "2 of Hearts",
    image: "2_of_hearts.svg"
  },
  {
    title: "3 of Hearts",
    image: "3_of_hearts.svg"
  },
  {
    title: "4 of Hearts",
    image: "4_of_hearts.svg"
  },
  {
    title: "5 of Hearts",
    image: "5_of_hearts.svg"
  },
  {
    title: "6 of Hearts",
    image: "6_of_hearts.svg"
  },
  {
    title: "7 of Hearts",
    image: "7_of_hearts.svg"
  },
  {
    title: "8 of Hearts",
    image: "8_of_hearts.svg"
  },
  {
    title: "9 of Hearts",
    image: "9_of_hearts.svg"
  },
  {
    title: "10 of Hearts",
    image: "10_of_hearts.svg"
  },
  {
    title: "Jack of Hearts",
    image: "jack_of_hearts.svg"
  },
  {
    title: "Queen of Hearts",
    image: "queen_of_hearts.svg"
  },
  {
    title: "King of Hearts",
    image: "king_of_hearts.svg"
  },
  {
    title: "Ace of Hearts",
    image: "ace_of_hearts.svg"
  },
  {
    title: "2 of Diamonds",
    image: "2_of_diamonds.svg"
  },
  {
    title: "3 of Diamonds",
    image: "3_of_diamonds.svg"
  },
  {
    title: "4 of Diamonds",
    image: "4_of_diamonds.svg"
  },
  {
    title: "5 of Diamonds",
    image: "5_of_diamonds.svg"
  },
  {
    title: "6 of Diamonds",
    image: "6_of_diamonds.svg"
  },
  {
    title: "7 of Diamonds",
    image: "7_of_diamonds.svg"
  },
  {
    title: "8 of Diamonds",
    image: "8_of_diamonds.svg"
  },
  {
    title: "9 of Diamonds",
    image: "9_of_diamonds.svg"
  },
  {
    title: "10 of Diamonds",
    image: "10_of_diamonds.svg"
  },
  {
    title: "Jack of Diamonds",
    image: "jack_of_diamonds.svg"
  },
  {
    title: "Queen of Diamonds",
    image: "queen_of_diamonds.svg"
  },
  {
    title: "King of Diamonds",
    image: "king_of_diamonds.svg"
  },
  {
    title: "Ace of Diamonds",
    image: "ace_of_diamonds.svg"
  }
];
const players = [
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
];
const playerRotation = [1, 2];
const currentPlayer = 1;
const askedCard = "king_of_diamonds.svg";
const playerAsked = 2;

describe("tests for card actions", () => {
  afterEach(() => {
    players[0].hand = [];
    players[1].hand = [];
  });
  it("DEAL CARDS: deck 42 cards && players 5 each", () => {
    const deal = dealCards(players, cards);
    const player1 = deal.players[0];
    const player2 = deal.players[1];

    expect(deal.deck.length).toBe(42);
    expect(player1.hand.length).toBe(5);
    expect(player2.hand.length).toBe(5);
  });

  it("DRAWS CARD: player has a new card and deck has one less", () => {
    const draw = drawCard(currentPlayer, cards, players);
    expect(draw.deck.length).toBe(51);
  });

  it("SHUFFLES CARDS: cards do not match shuffled cards", () => {
    const shuffle = shuffleCards(cards, 10);

    expect(shuffle[0]).not.toBe(cards[0]);
    expect(shuffle[shuffle.length - 1]).not.toBe(cards[cards.length - 1]);
    expect(shuffle.length).toBe(cards.length);
  });

  it("REMOVE CARD: card is removed from hand", () => {
    players[0].hand = [
      {
        title: "King of Spades",
        image: "king_of_spades.svg"
      }
    ];
    const removeCard = removeCardFromHand(
      currentPlayer,
      "King of Spades",
      players
    );
    expect(players[0].hand).toEqual([]);
  });

  it("GIVE POINTS: gives a player points", () => {
    players[0].points = 0;
    const points = givePlayerPoints(currentPlayer, players);
    expect(points[0].points).toBe(1);
  });

  it("HAS MATCH: checks if card numbers match", () => {
    players[0].hand = [
      { title: "King of Spades", image: "king_of_spades.svg" }
    ];
    players[1].hand = [
      { title: "King of Hearts", image: "king_of_hearts.svg" }
    ];

    const match = hasMatch(
      players,
      "King of Spades",
      playerAsked,
      currentPlayer
    );

    expect(match.hasMatch).toEqual(true);
    expect(match.matches).toEqual(["King of Hearts", "King of Spades"]);
  });
  it("NEXT PLAYER: get the next player to take a turn", () => {
    const next = nextPlayer(playerRotation, currentPlayer);

    expect(next.currentPlayer).toEqual(playerRotation[1]);
    expect(next.currentPlayer).not.toEqual(playerRotation[0]);
  });

  it("GET WINNER: gets a winner from players", () => {
    players[0].hand = [
      { title: "King of Spades", image: "king_of_spades.svg" }
    ];
    const winner = getWinner(players);
    expect(winner).toBe(2);
  });

  it("GET HAND LENGTH: gets length of single players hand", () => {
    const handLength = getHandLength(currentPlayer, players);

    expect(handLength).toEqual(0);
  });

  it("HAS HAND MATCH: removes matches in hand", () => {
    players[0].hand = [
      { title: "King of Spades", image: "king_of_spades.svg" },
      { title: "King of Hearts", image: "king_of_hearts.svg" }
    ];

    const match = hasHandMatch(players[0].hand);

    expect(match.hasHandMatch).toEqual(true);
    expect(match.matches).toStrictEqual([
      { title: "King of Spades", image: "king_of_spades.svg" },
      { title: "King of Hearts", image: "king_of_hearts.svg" }
    ]);
  });
});
