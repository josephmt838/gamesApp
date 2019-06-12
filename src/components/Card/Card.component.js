import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./Card.scss";

const Card = ({
  link,
  children,
  handleClick,
  id,
  flipped,
  back,
  front,
  height,
  width,
  title,
  disabled,
  solved
}) => {
  return (
    <Fragment>
      {link && link.length ? (
        <Link to={link} style={{ textDecoration: "none" }}>
          <div className="card">{children}</div>
        </Link>
      ) : (
        <div
          className={`card ${flipped ? "flipped" : ""}`}
          onClick={() => (disabled || solved ? null : handleClick(id))}
        >
          {children ? (
            children
          ) : (
            <div className="flipper">
              <img
                style={{ height, width }}
                src={solved || flipped ? front : back}
                alt="card"
              />
              <h3>{flipped || solved ? title : ""}</h3>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

Card.propTypes = {
  link: PropTypes.string,
  children: PropTypes.node,
  handleClick: PropTypes.func,
  flipped: PropTypes.bool,
  back: PropTypes.string,
  front: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  title: PropTypes.string
};

export default Card;
