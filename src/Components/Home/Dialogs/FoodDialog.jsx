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
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { isSameDay, parseISO } from "date-fns";

import { HttpUtilities } from "../Utilities/Utilities";

import "./FoodDialog.css";

export default function FoodDialog(props) {
  const [isLoading, setLoading] = React.useState(false);
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
    addFoodItem(name, kcal, type, time);
  };

  const handleCloseCancel = () => {
    props.onClose();
    resetFields();
  };

  const resetFields = () => {
    setLoading(false);
    setName("");
    setKcal(0);
    setType(defaultFoodValue);
    setTime(new Date());
  };

  const addFoodItem = async (name, calories, type, time) => {
    let array = props.items;

    setLoading(true);

    const requestOptions = HttpUtilities.generateRequestOptions({
      Name: name,
      Calories: calories,
      Type: type,
      Time: new Date(time).toISOString(),
      Email: props.user.email,
      Hash: props.user.hash,
    });

    let http = await fetch("https://localhost:44307/api/food/", requestOptions);
    let json = await http.json();
    if (http.ok) {
      array.push(json.food);

      let calories = 0;
      for (let item of array) {
        if (isSameDay(parseISO(item.time), props.context.state.selectedDate)) {
          calories += parseInt(item.calories);
        }
      }

      props.context.setState(
        (prevState) => ({
          user: {
            ...prevState.user,
            currentCalorieIntake: calories,
            foodItems: array,
          },
        }),
        function () {
          resetFields();
          props.onClose();
        }
      );
    }
  };

  return (
    <div>
      <Dialog open={props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add {type.toUpperCase()}</DialogTitle>
        <DialogContent>
          <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={1}>
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
                  endAdornment: <InputAdornment position="end">kcal</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item>
              <FormControl component="fieldset">
                <FormLabel component="legend">Type</FormLabel>
                <RadioGroup aria-label="type" name="type" value={type} onChange={handleChange}>
                  <FormControlLabel value="food" control={<Radio />} label="Food" />
                  <FormControlLabel value="drink" control={<Radio />} label="Drink" />
                  <FormControlLabel value="snack" control={<Radio />} label="Snack" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker value={time} onChange={setTime} variant="outlined" label="Time" id="time" ampm={false} className={ClassTimePicker} />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel} disabled={isLoading} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseSave} disabled={isLoading} color="primary">
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
