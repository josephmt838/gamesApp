const helpers = {
  shuffleDeck: (deck) => {
    const arr = [...deck];

    for (let i in arr) {
      let random = Math.floor(Math.random() * Object.keys(arr).length);
      let temp = arr[i];
      arr[i] = arr[random];
      arr[random] = temp;
    }
    return arr;
  },
  initializeDeck: (cardAmount, cardCategory) => {
    let id = 0;
    let cards = require(`./assets/cards/${cardCategory}`);
    cards = cards.default;
    cards = helpers.shuffleDeck(cards);
    cards = cards.reduce((acc, type) => {
      if (id < cardAmount * 2) {
        acc.push({
          id: id++,
          type
        });
        acc.push({
          id: id++,
          type
        });
      }

      return acc;
    }, []);
    return helpers.shuffleDeck(cards);
  },
  checkGameStart: (username, cardCategory) => {
    return username && username.length && cardCategory && cardCategory.length
      ? true
      : false;
  }
};

export default helpers;
