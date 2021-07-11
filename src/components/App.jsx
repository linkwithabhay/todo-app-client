import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

// Custom Components
import Navbar from "./Navbar";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Auth from "./Auth";

export default function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => (!user ? <Home /> : <Dashboard />)} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/" />)} />
        </Switch>
      </Router>
    </>
  );
}
