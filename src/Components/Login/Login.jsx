import React from "react";
import {
  Grid,
  Button,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Hidden,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils as IconUtensils } from "@fortawesome/free-solid-svg-icons";
import { Bounce } from "react-reveal";

import "./Login.css";

const ClassLoopingBackground = "looping-background vignette";
const ClassCentered = "centered";
const ClassCard = "form";
const ClassProgressButton = "loadingButton";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingLogin: false,
      isShowingRegister: false,
      isLoading: false,
      errorMessage: null,
      errorMessageFor: null,
    };
  }

  render() {
    const ShowLogin = () => {
      this.setState({
        isShowingLogin: true,
      });
    };

    const ShowRegister = () => {
      this.setState({
        isShowingRegister: true,
      });
    };

    const Hide = () => {
      this.setState({
        isShowingLogin: false,
        isShowingRegister: false,
        errorMessage: null,
        errorMessageFor: null,
      });
    };

    const Login = () => {
      this.setState({
        isLoading: true,
        errorMessage: null,
        errorMessageFor: null,
      });

      // Add connection to database
      setTimeout(() => {
        Abort();
      }, 4000);
    };

    const Register = () => {
      this.setState({
        isLoading: true,
        errorMessage: null,
        errorMessageFor: null,
      });

      // Add connection to database
      setTimeout(() => {
        Abort();
      }, 4000);
    };

    const Abort = () => {
      this.setState({
        isLoading: false,
        errorMessage: "Incorrect credentials.",
        errorMessageFor: "email-input",
      });
    };

    return (
      <Grid container direction="row" alignItems="stretch">
        <Hidden smDown>
          <Grid item md={6} className={ClassLoopingBackground} />
        </Hidden>
        <Grid item md={6} xs={12}>
          <div className={ClassCentered}>
            <div className={ClassCard}>
              <FontAwesomeIcon icon={IconUtensils} />
              <h2>{"Keep track of your calorie intake"}</h2>
              <h3>
                {this.state.isShowingLogin || this.state.isShowingRegister
                  ? this.state.isShowingRegister
                    ? "Sign up below."
                    : "Log in below."
                  : "Sign up today."}
              </h3>
              <Bounce
                bottom
                collapse
                when={this.state.isShowingLogin || this.state.isShowingRegister}
              >
                <Box m={1}>
                  <FormControl
                    fullWidth={true}
                    variant="standard"
                    required={true}
                    focused={false}
                    disabled={this.state.isLoading}
                    error={this.state.errorMessageFor === "email-input"}
                  >
                    <InputLabel htmlFor="email-input">Email address</InputLabel>
                    <Input
                      type="email"
                      id="email-input"
                      aria-describedby="email-helper-text"
                    />
                    <FormHelperText id="email-helper-text">
                      {this.state.errorMessageFor === "password-input"
                        ? this.state.errorMessage
                        : "We'll never share your email."}
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    fullWidth={true}
                    variant="standard"
                    required={true}
                    focused={false}
                    disabled={this.state.isLoading}
                    error={this.state.errorMessageFor === "password-input"}
                  >
                    <InputLabel htmlFor="password-input">Password</InputLabel>
                    <Input
                      type="password"
                      id="password-input"
                      aria-describedby="password-helper-text"
                    />
                    <FormHelperText id="password-helper-text">
                      {this.state.errorMessageFor === "password-input" &&
                        this.state.errorMessage}
                    </FormHelperText>
                  </FormControl>
                  {this.state.isShowingRegister ? (
                    <FormControl
                      fullWidth={true}
                      variant="standard"
                      required={true}
                      focused={false}
                      disabled={this.state.isLoading}
                      error={
                        this.state.errorMessageFor === "password-again-input"
                      }
                    >
                      <InputLabel htmlFor="password-again-input">
                        Password again
                      </InputLabel>
                      <Input
                        type="password"
                        id="password-again-input"
                        aria-describedby="password-again-helper-text"
                      />
                      <FormHelperText id="password-again-helper-text">
                        {this.state.errorMessageFor ===
                          "password-again-input" && this.state.errorMessage}
                      </FormHelperText>
                    </FormControl>
                  ) : null}
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    fullWidth={true}
                    disabled={this.state.isLoading}
                    onClick={this.state.isShowingLogin ? Login : Register}
                  >
                    {this.state.isShowingLogin ? "LOG IN" : "SIGN UP"}
                    {this.state.isLoading && (
                      <CircularProgress
                        size={24}
                        className={ClassProgressButton}
                      />
                    )}
                  </Button>
                  <p className={ClassCentered}>OR</p>
                  <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                    fullWidth={true}
                    disabled={this.state.isLoading}
                    onClick={Hide}
                  >
                    GO BACK
                  </Button>
                </Box>
              </Bounce>
              <Bounce
                bottom
                collapse
                when={
                  !this.state.isShowingLogin && !this.state.isShowingRegister
                }
              >
                <Grid container spacing={1}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={ShowRegister}
                    >
                      SIGN UP
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      disableElevation
                      onClick={ShowLogin}
                    >
                      LOG IN
                    </Button>
                  </Grid>
                </Grid>
              </Bounce>
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}
