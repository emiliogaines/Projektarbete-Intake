import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";

import "./Loading.css";

const ClassLoading = "loading";

export default class Loading extends React.Component {
  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="stretch">
        <CircularProgress className={ClassLoading} />
      </Grid>
    );
  }
}
