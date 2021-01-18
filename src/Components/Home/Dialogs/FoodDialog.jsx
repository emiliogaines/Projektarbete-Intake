import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormControl,
  FormLabel,
  DialogActions,
  InputAdornment,
} from "@material-ui/core";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { isSameDay } from "date-fns";

import "./FoodDialog.css";
import { Utilities } from "../Utilities/Utilities";

export default function FoodDialog(props) {
  const defaultFoodValue = "food";
  const [type, setType] = React.useState(defaultFoodValue);
  const [name, setName] = React.useState("");
  const [kcal, setKcal] = React.useState(0);
  const [time, setTime] = React.useState(new Date());

  const ClassTimePicker = "timePicker";

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeKcal = (event) => {
    setKcal(parseInt(event.target.value) || 0);
  };

  const handleCloseSave = () => {
    props.onClose();
    addFoodItem(name, kcal, type, time);
    setName("");
    setKcal(0);
    setType(defaultFoodValue);
    setTime(new Date());
  };

  const handleCloseCancel = () => {
    props.onClose();
    setName("");
    setKcal(0);
    setType(defaultFoodValue);
    setTime(new Date());
  };

  const addFoodItem = (name, kcal, type, time) => {
    if (name === undefined) return;
    let array = props.items;

    let id = 0;
    if (array !== undefined && array.length > 0) {
      for (let data of array) {
        id = Math.max(data.id, id);
      }
      id += 1;
    }

    array.push({
      id: id,
      name: name,
      icon: Utilities.getIcon(type, name),
      kcal: kcal,
      time: Utilities.getTimeFromEpoch(time),
      date: time,
      keywords: name.length > 0 ? name.split(" ") : [],
    });

    array.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));

    let calories = 0;
    for (let item of array) {
      if (isSameDay(item.date, props.context.state.selectedDate)) {
        calories += parseInt(item.kcal);
      }
    }

    props.context.setState((prevState) => ({
      foodItems: array,
      User: { ...prevState.User, currentKcalIntake: calories },
    }));
  };

  return (
    <div>
      <Dialog open={props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Add {type.toUpperCase()}
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            spacing={1}
          >
            <Grid item>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                variant="outlined"
                value={name}
                onChange={handleChangeName}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                autoFocus
                margin="dense"
                id="kcal"
                label="Calories"
                type="number"
                variant="outlined"
                value={kcal}
                onChange={handleChangeKcal}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kcal</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <FormControl component="fieldset">
                <FormLabel component="legend">Type</FormLabel>
                <RadioGroup
                  aria-label="type"
                  name="type"
                  value={type}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="food"
                    control={<Radio />}
                    label="Food"
                  />
                  <FormControlLabel
                    value="drink"
                    control={<Radio />}
                    label="Drink"
                  />
                  <FormControlLabel
                    value="snack"
                    control={<Radio />}
                    label="Snack"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <TimePicker
                  value={time}
                  onChange={setTime}
                  variant="outlined"
                  label="Time"
                  id="time"
                  ampm={false}
                  className={ClassTimePicker}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseSave} color="primary">
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
