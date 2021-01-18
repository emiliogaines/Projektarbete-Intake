import { LoginTheme } from "./Theme/Theme";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import "./App.css";

import React from "react";
import { Container } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

const containerClass = "container";

export default class App extends React.Component {
  render() {
    return (
      <Container
        maxWidth={false}
        disableGutters={true}
        className={containerClass}
      >
        <ThemeProvider theme={LoginTheme}>
          <Login />
        </ThemeProvider>
      </Container>
    );
  }
}
//use stepper
