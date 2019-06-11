import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

// import containers
import GamesMenu from "../GamesMenu";
import WrongPage from "../WrongPage";
import MemoryGame from "../MemoryGame";
import GoFish from "../GoFish/GoFish.component";

const GamesDashboard = (props) => {
  return (
    <Fragment>
      <h1>Games</h1>
      <Switch>
        <Route path="/" exact component={GamesMenu} />
        <Route path="/memorygame" exact component={MemoryGame} />
        <Route path="/gofish" exact component={GoFish} />
        <Route component={WrongPage} />
      </Switch>
    </Fragment>
  );
};

export default GamesDashboard;
