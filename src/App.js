import { LoginTheme } from "./Theme/Theme";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Loading from "./Components/Loading/Loading";

import { HttpUtilities } from "./Components/Home/Utilities/Utilities";

import "./App.css";

import React from "react";
import { Container } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import { read_cookie, delete_cookie, bake_cookie } from "sfcookies";

const containerClass = "container";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, isLoading: false };
  }

  tryLogin = async (email, hash) => {
    const requestOptions = HttpUtilities.generateRequestOptions({
      Email: email,
      Hash: hash,
    });

    let http = await fetch("https://localhost:44307/api/verify/", requestOptions);
    let json = await http.json();
    if (http.ok) {
      bake_cookie("logincredentials", {
        key: json.user.email,
        hash: json.user.hash,
      });
      this.setState({ isLoading: false }, function () {
        this.onLogin(json);
      });
    } else {
      delete_cookie("logincredentials");
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    var cookie = read_cookie("logincredentials");
    if ("key" in cookie && "hash" in cookie) {
      this.setState({ isLoading: true });
      this.tryLogin(cookie.key, cookie.hash);
    }
  }

  onLogin = (user) => {
    if ("user" in user) {
      this.setState({ user: user.user });
    }
  };

  onLogout = () => {
    delete_cookie("logincredentials");
    this.setState({ user: null, isLoading: false });
  };

  render() {
    return (
      <Container maxWidth={false} disableGutters={true} className={containerClass}>
        <ThemeProvider theme={LoginTheme}>
          {this.state.isLoading ? (
            <Loading />
          ) : this.state.user == null ? (
            <Login onLogin={this.onLogin} />
          ) : (
            <Home user={this.state.user} onLogout={this.onLogout} />
          )}
        </ThemeProvider>
      </Container>
    );
  }
}
//use stepper
