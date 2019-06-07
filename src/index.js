import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import GamesDashboard from "./containers/GamesDashboard";

ReactDOM.render(
  <Router>
    <GamesDashboard />
  </Router>,
  document.getElementById("root")
);
