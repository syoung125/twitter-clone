import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Router exact path="/">
              <Home />
            </Router>
          </>
        ) : (
          <Router exact path="/">
            <Auth />
          </Router>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
