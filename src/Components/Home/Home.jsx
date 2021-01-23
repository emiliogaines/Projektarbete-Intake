import React from "react";
import { Grid, Card, CardContent, Typography, IconButton, LinearProgress, ThemeProvider, Hidden, Fab } from "@material-ui/core";

import { Zoom, Fade } from "react-reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWeightHanging as IconWeight,
  faBurn as IconBurn,
  faUtensils as IconAddFood,
  faAngleLeft as IconBack,
  faAngleRight as IconForward,
  faCogs as IconSettings,
} from "@fortawesome/free-solid-svg-icons";
import { format, isSameDay, addDays, subDays, differenceInCalendarDays, parseISO } from "date-fns";

// Dialogs
import FoodDialog from "./Dialogs/FoodDialog";
import SettingsDialog from "./Dialogs/SettingsDialog";
// Components
import FoodCard from "./Components/FoodCard.jsx";
// Utilites
import "./Utilities/Utilities";
// Constants
import "../../Constants/Constants";

import "./Home.css";
import { MainTheme } from "../../Theme/Theme";
import { Color } from "../../Constants/Constants";
import { Utilities, UserUtilities } from "./Utilities/Utilities";

const ClassGrid = "card";
const ClassLinearProgress = "linearProgress";
const ClassCardContainer = "cardContainer";
const ClassFabIcon = "fabIcon";
const ClassFoodTextContainer = "foodTextContainer";

const today = new Date();

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFoodDialogOpen: false,
      isSettingsDialogOpen: false,
      selectedDate: new Date(),
      user: this.props.user,
    };
  }

  componentDidMount() {
    Utilities.updateCalories(this);
  }

  render() {
    const onFoodDialogClose = () => {
      this.setState({ isFoodDialogOpen: false });
    };

    const openFoodDialog = () => {
      this.setState({ isFoodDialogOpen: true });
    };

    const onSettingsDialogClose = (name, startWeight, currentWeight, targetWeight, targetCalorieIntake, useMetric) => {
      this.setState((prevState) => ({
        isSettingsDialogOpen: false,
        user: {
          ...prevState.user,
          name: name,
          startWeight: startWeight,
          currentWeight: currentWeight,
          targetWeight: targetWeight,
          targetCalorieIntake: targetCalorieIntake,
          useMetric: useMetric,
        },
      }));
    };

    const openSettingsDialog = () => {
      this.setState({ isSettingsDialogOpen: true });
    };

    const getDate = () => {
      return differenceInCalendarDays(this.state.selectedDate, today) === 0 ? "TODAY" : format(this.state.selectedDate, "dd/MM/yyyy");
    };

    const getWeightUnit = () => {
      return this.state.user.useMetric ? "kg" : "lbs";
    };

    const incrementDate = () => {
      let date = addDays(this.state.selectedDate, 1);
      this.setState({ selectedDate: date }, function () {
        Utilities.updateCalories(this);
      });
    };

    const decrementDate = () => {
      let date = subDays(this.state.selectedDate, 1);
      this.setState({ selectedDate: date }, function () {
        Utilities.updateCalories(this);
      });
    };

    const getFoodItems = () => {
      let items = [];
      for (let item of this.state.user.foodItems) {
        if (isSameDay(parseISO(item.time), this.state.selectedDate)) {
          items.push(item);
        }
      }
      items.sort((a, b) => (a.time > b.time ? 1 : b.time > a.time ? -1 : 0));
      return items;
    };

    return (
      <div>
        <Grid container direction="row" alignItems="flex-start" justify="space-between" alignContent="flex-start" className={ClassCardContainer}>
          <Hidden mdDown>
            <Grid item lg={2} />
          </Hidden>
          <Grid item lg={3} md={6} sm={12} xs={12}>
            <h1>About</h1>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Grid item>
                <h2>{this.state.user.name}</h2>
              </Grid>
              <Grid item>
                <IconButton onClick={openSettingsDialog}>
                  <FontAwesomeIcon icon={IconSettings} color={Color.BLACK} />
                </IconButton>
              </Grid>
            </Grid>
            <Zoom cascade>
              <div>
                <Card className={ClassGrid} variant="outlined">
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      <FontAwesomeIcon color={MainTheme.palette.primary.main} icon={IconWeight} /> Weight (
                      {Math.max(Math.ceil(UserUtilities.getPercentageOfWeightText(this)), 0)}% left)
                    </Typography>
                    <Grid container direction="row" justify="center" alignItems="center">
                      <Grid item xs={4}>
                        <Typography variant="h5" component="h2">
                          Current
                        </Typography>
                        <Typography color="textSecondary">
                          {this.state.user.currentWeight} {getWeightUnit()}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="h5" component="h2">
                          Target
                        </Typography>
                        <Typography color="textSecondary">
                          {this.state.user.targetWeight} {getWeightUnit()}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="h5" component="h2">
                          Start
                        </Typography>
                        <Typography color="textSecondary">
                          {this.state.user.startWeight} {getWeightUnit()}
                        </Typography>
                      </Grid>
                    </Grid>
                    <ThemeProvider theme={Utilities.getThemeFromPercentage(UserUtilities.getPercentageOfWeight(this))}>
                      <LinearProgress className={ClassLinearProgress} variant="determinate" value={UserUtilities.getPercentageOfWeight(this)} />
                    </ThemeProvider>
                  </CardContent>
                </Card>
                <Card className={ClassGrid} variant="outlined">
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      <FontAwesomeIcon color={MainTheme.palette.warning.main} icon={IconBurn} /> Calorie intake (today)
                    </Typography>
                    <Grid container direction="row" justify="center" alignItems="center">
                      <Grid item xs={4}>
                        <Typography variant="h5" component="h2">
                          Current
                        </Typography>
                        <Typography color="textSecondary">
                          {this.state.user.currentCalorieIntake} {this.state.user.unitKcal}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="h5" component="h2">
                          Target
                        </Typography>
                        <Typography color="textSecondary">
                          {this.state.user.targetCalorieIntake} {this.state.user.unitKcal}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="h5" component="h2">
                          Left
                        </Typography>
                        <Typography color="textSecondary">
                          {Math.max(this.state.user.targetCalorieIntake - this.state.user.currentCalorieIntake, 0)} {this.state.user.unitKcal}
                        </Typography>
                      </Grid>
                    </Grid>
                    <ThemeProvider theme={Utilities.getThemeFromPercentage(UserUtilities.getPercentageOfCalories(this))}>
                      <LinearProgress className={ClassLinearProgress} variant="determinate" value={UserUtilities.getPercentageOfCalories(this)} />
                    </ThemeProvider>
                  </CardContent>
                </Card>
              </div>
            </Zoom>
          </Grid>
          <Hidden mdDown>
            <Grid item lg={2} />
          </Hidden>
          <Grid item lg={3} md={6} sm={12} xs={12}>
            <Grid container direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <IconButton onClick={decrementDate} aria-label="previous">
                  <FontAwesomeIcon icon={IconBack} />
                </IconButton>
              </Grid>
              <Grid item>
                <h2>{getDate()}</h2>
              </Grid>
              <Grid item>
                <IconButton disabled={differenceInCalendarDays(this.state.selectedDate, today) === 0} onClick={incrementDate} aria-label="next">
                  <FontAwesomeIcon icon={IconForward} />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container direction="row" justify="space-between" alignItems="center" alignContent="flex-start">
              <Grid item>
                <h1>Timeline</h1>
              </Grid>
              <Grid item>
                <Fab variant="extended" color="primary" aria-label="add" size="medium" onClick={openFoodDialog}>
                  <FontAwesomeIcon icon={IconAddFood} className={ClassFabIcon} /> OM NOM
                </Fab>
              </Grid>
            </Grid>
            <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={1}>
              {getFoodItems().map((item) => (
                <Grid item key={item.id}>
                  <Fade right duration={300}>
                    <FoodCard context={this} items={this.state.user.foodItems} key={item.id} food={item} user={this.state.user} />
                  </Fade>
                </Grid>
              ))}
              <Grid item className={ClassFoodTextContainer}>
                <Fade bottom when={this.state.user.foodItems.length === 0}>
                  <h4>Add food to get started</h4>
                </Fade>
              </Grid>
            </Grid>
          </Grid>
          <Hidden mdDown>
            <Grid item lg={2} />
          </Hidden>
        </Grid>
        <FoodDialog
          context={this}
          user={this.state.user}
          items={this.state.user.foodItems}
          open={this.state.isFoodDialogOpen}
          onClose={onFoodDialogClose}
        />

        <SettingsDialog
          user={this.state.user}
          open={this.state.isSettingsDialogOpen}
          onClose={onSettingsDialogClose}
          onLogout={this.props.onLogout}
        />
      </div>
    );
  }
}
