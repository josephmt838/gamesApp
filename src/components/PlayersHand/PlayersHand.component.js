import React from "react";
import PropTypes from "prop-types";
import "./PlayersHand.scss";

const PlayersHand = ({ player, disabled, selectCard }) => {
  const { type, hand, points } = player;
  return (
    <section className={`${type}-hand`}>
      <strong>Points: {points ? points : 0}</strong>
      {hand.map((card, i) => {
        const { image, title } = card;
        if (type === "cpu" && i > 4) return null;
        return (
          <img
            src={`./assets/CardGame/cards/${
              type === "cpu" ? "cardback.svg" : image
            }`}
            alt={title}
            key={image}
            value={image}
            className={`${type}-card`}
            onClick={
              type === "human"
                ? (e) => (disabled ? null : selectCard(title))
                : null
            }
            style={
              type === "human"
                ? { width: `Math.floor(1 / hand.length)%`, zIndex: i + 10 }
                : null
            }
          />
        );
      })}
    </section>
  );
};

PlayersHand.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.number,
    hand: PropTypes.arrayOf(PropTypes.object),
    type: PropTypes.string,
    points: PropTypes.number
  }).isRequired,
  disabled: PropTypes.bool,
  selectCard: PropTypes.func
};

PlayersHand.defaultProps = {
  selectCard: (e) => console.log(e)
};

export default PlayersHand;
