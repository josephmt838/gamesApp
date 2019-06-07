import React from "react";
import PropTypes from "prop-types";

const RulesList = ({ children }) => {
  return <section className="rules-list">{children}</section>;
};

RulesList.propTypes = {
  children: PropTypes.node
};

export default RulesList;
