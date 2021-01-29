import { Grid, Card, Chip, CardContent, CardHeader, IconButton, CardMedia } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle as IconClose } from "@fortawesome/free-solid-svg-icons";

import { Utilities, HttpUtilities } from "../Utilities/Utilities";

export default function FoodCard(props) {
  const ClassChip = "chip";
  const ClassChipIcon = "chipIcon";

  var api = JSON.parse(props.food.apiData) || null;
  if (api != null) {
    if ("common" in api) {
      api = api.common;
      if (Array.isArray(api) && api.length > 0) {
        api = api[0];
      }
    }
  }

  const removeFoodItem = async (index) => {
    let array = props.items;

    const requestOptions = HttpUtilities.generateRequestOptions({
      Email: props.user.email,
      Hash: props.user.hash,
    });

    let http = await fetch("https://localhost:44307/api/food/" + index, requestOptions);
    if (http.ok) {
      array.splice(
        array.findIndex(function (i) {
          return i.id === index;
        }),
        1
      );

      props.context.setState({ foodItems: array }, function () {
        Utilities.updateCalories(this);
      });
    }
  };

  let icon = Utilities.getIconSvg(props.food.type, props.food.name);
  let chips = [props.food.type];
  if (api != null) {
    // Feature removed
    /* if ("serving_qty" in api && "serving_unit" in api) {
      chips.push(api.serving_qty + " " + api.serving_unit);
    } */
    if ("tag_name" in api) {
      chips.push(api.tag_name);
    }
  }

  let iconUrl = "photo" in api && "thumb" in api.photo ? api.photo.thumb : null;
  let iconAlt = "tag_name" in api ? api.tag_name : null;

  return (
    <Grid item>
      <Card elevation={2}>
        <CardHeader
          title={props.food.name}
          subheader={"at " + Utilities.getTimeFromEpoch(props.food.time) + " containing " + props.food.calories + " kcal"}
          action={
            <IconButton aria-label="remove" onClick={() => removeFoodItem(props.food.id)} id={props.food.id}>
              <FontAwesomeIcon className={ClassChipIcon} icon={IconClose} id={props.food.id} />
            </IconButton>
          }
        />
        {iconUrl != null ? <CardMedia image={iconUrl} title={iconAlt} /> : null}
        <CardContent>
          {chips.map((word) => (
            <Chip
              key={word}
              className={ClassChip}
              label={word.toUpperCase()}
              color="primary"
              clickable={true}
              icon={chips[0] === word ? <FontAwesomeIcon icon={icon} /> : null}
              style={{
                backgroundColor: chips[0] === word ? Utilities.getColorFromType(props.food.type) : null,
              }}
            />
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
}
