import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignupEnd from "./pages/Login/SignupEnd";
import Main from "./pages/Main/Main";
import Notice from "./pages/Notice/Notice";
import NoticeWriting from "./pages/Notice/NoticeWriting";
import Project from "./pages/Project/Project";
import EditUserInfo from "./pages/EditUserInfo/EditUserInfo";
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";
import Side from "./components/Side/Side";
import NoticeDetailPage from "./pages/Notice/NoticeDetailPage";
import { CookiesProvider } from "react-cookie";
import SignUp from "./components/SignUpComponents/SignUpComponents";

class Routes extends Component {
  render() {
    return (
      <CookiesProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route
              exact
              path="*"
              component={() => (
                <>
                  <Nav />
                  <Side />
                  <Route exact path="/Main" component={Main} />
                  <Route exact path="/Notice" component={Notice} />
                  <Route exact path="/Project" component={Project} />
                  <Route
                    exact
                    path="/NoticeWriting"
                    component={NoticeWriting}
                  />
                  <Route
                    exact
                    path="/NoticeDetailPage"
                    component={NoticeDetailPage}
                  />
                  <Route exact path="/Signup" component={SignUp} />
                  <Route exact path="/Profile" component={EditUserInfo} />
                  <Route exact path="/Footer" component={Footer} />
                </>
              )}
            />
          </Switch>
        </Router>
      </CookiesProvider>
    );
  }
}

export default Routes;
