import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Notice from "./pages/Notice/Notice";
import Project from "./pages/Project/Project";
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";
import Side from "./components/Side/Side";
import EditUserInfo from "./pages/EditUserInfo/EditUserInfo";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Main" component={Main} />
          <Route exact path="/Notice" component={Notice} />
          <Route exact path="/Project" component={Project} />
          <Route exact path="/Profile" component={EditUserInfo} />
          <Route exact path="/Nav" component={Nav} />
          <Route exact path="/Footer" component={Footer} />
          <Route exact path="/Side" component={Side} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
