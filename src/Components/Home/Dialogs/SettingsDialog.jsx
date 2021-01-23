import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  DialogActions,
  InputAdornment,
} from "@material-ui/core";

import { HttpUtilities } from "../Utilities/Utilities";
import { Type } from "../../../Constants/Constants.tsx";

export default function SettingsDialog(props) {
  const [isLoading, setLoading] = React.useState(false);
  const [name, setName] = React.useState(props.user.name);
  const [startWeight, setStartWeight] = React.useState(props.user.startWeight);
  const [currentWeight, setCurrentWeight] = React.useState(props.user.currentWeight);
  const [targetWeight, setTargetWeight] = React.useState(props.user.targetWeight);
  const [targetKcalIntake, setTargetKcalIntake] = React.useState(props.user.targetCalorieIntake);
  const [useMetric, setMetric] = React.useState(props.user.useMetric);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeStartWeight = (event) => {
    setStartWeight(parseInt(event.target.value) || 0);
  };

  const handleChangeCurrentWeight = (event) => {
    setCurrentWeight(parseInt(event.target.value) || 0);
  };

  const handleChangeTargetWeight = (event) => {
    setTargetWeight(parseInt(event.target.value) || 0);
  };

  const handleChangeTargetKcalIntake = (event) => {
    setTargetKcalIntake(parseInt(event.target.value) || 0);
  };

  const handleChangeUseMetric = (event) => {
    setMetric(!useMetric);
  };

  const handleClose = async () => {
    setLoading(true);

    const requestOptions = HttpUtilities.generateRequestOptions({
      Id: props.user.id,
      Name: name,
      StartWeight: startWeight,
      CurrentWeight: currentWeight,
      TargetWeight: targetWeight,
      TargetCalorieIntake: targetKcalIntake,
      UseMetric: useMetric,
      Email: props.user.email,
      Hash: props.user.hash,
    });

    let http = await fetch("https://localhost:44307/api/user/" + props.user.id, requestOptions);
    setLoading(false);
    if (http.ok) {
      props.onClose(name, startWeight, currentWeight, targetWeight, targetKcalIntake, useMetric);
    }
  };

  const handleCloseCancel = () => {
    props.onClose();
  };

  const getWeightUnit = () => {
    return useMetric ? "kg" : "lbs";
  };

  const getUnit = (field) => {
    switch (field.unit) {
      case Type.WEIGHT:
        return getWeightUnit();
      case Type.CAL:
        return "kcal";
      default:
        return null;
    }
  };

  const fields = [
    {
      id: 1,
      value: name,
      handler: handleChangeName,
      label: "Name",
      unit: Type.NULL,
    },
    {
      id: 2,
      value: startWeight,
      handler: handleChangeStartWeight,
      label: "Start weight",
      unit: Type.WEIGHT,
    },
    {
      id: 3,
      value: currentWeight,
      handler: handleChangeCurrentWeight,
      label: "Current weight",
      unit: Type.WEIGHT,
    },
    {
      id: 4,
      value: targetWeight,
      handler: handleChangeTargetWeight,
      label: "Target weight",
      unit: Type.WEIGHT,
    },
    {
      id: 5,
      value: targetKcalIntake,
      handler: handleChangeTargetKcalIntake,
      label: "Target intake",
      unit: Type.CAL,
    },
  ];

  return (
    <div>
      <Dialog open={props.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Settings</DialogTitle>
        <DialogContent>
          <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={1}>
            {fields.map((field) => {
              return (
                <Grid item key={field.id}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label={field.label}
                    type="text"
                    variant="outlined"
                    value={field.value}
                    onChange={field.handler}
                    fullWidth
                    InputProps={{
                      endAdornment: <InputAdornment position="end">{getUnit(field)}</InputAdornment>,
                    }}
                  />
                </Grid>
              );
            })}
            <Grid item>
              <FormControlLabel control={<Checkbox checked={useMetric} onChange={handleChangeUseMetric} color="primary" />} label="Use metric" />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" disableElevation onClick={props.onLogout}>
                Log out
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel} disabled={isLoading} color="primary">
            CANCEL
          </Button>
          <Button onClick={handleClose} disabled={isLoading} color="primary">
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
