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

import { Type } from "../../../Constants/Constants.tsx";

export default function SettingsDialog(props) {
  const [name, setName] = React.useState(props.user.name);
  const [startWeight, setStartWeight] = React.useState(props.user.startWeight);
  const [currentWeight, setCurrentWeight] = React.useState(
    props.user.currentWeight
  );
  const [targetWeight, setTargetWeight] = React.useState(
    props.user.targetWeight
  );
  const [targetKcalIntake, setTargetKcalIntake] = React.useState(
    props.user.targetKcalIntake
  );
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

  const handleClose = () => {
    props.onClose(
      name,
      startWeight,
      currentWeight,
      targetWeight,
      targetKcalIntake,
      useMetric
    );
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
      value: name,
      handler: handleChangeName,
      label: "Name",
      unit: Type.NULL,
    },
    {
      value: startWeight,
      handler: handleChangeStartWeight,
      label: "Start weight",
      unit: Type.WEIGHT,
    },
    {
      value: currentWeight,
      handler: handleChangeCurrentWeight,
      label: "Current weight",
      unit: Type.WEIGHT,
    },
    {
      value: targetWeight,
      handler: handleChangeTargetWeight,
      label: "Target weight",
      unit: Type.WEIGHT,
    },
    {
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
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            spacing={1}
          >
            {fields.map((field) => {
              return (
                <Grid item key={field}>
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
                      endAdornment: (
                        <InputAdornment position="end">
                          {getUnit(field)}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              );
            })}
            <FormControlLabel
              control={
                <Checkbox
                  checked={useMetric}
                  onChange={handleChangeUseMetric}
                  color="primary"
                />
              }
              label="Use metric"
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel} color="primary">
            CANCEL
          </Button>
          <Button onClick={handleClose} color="primary">
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
