import {
  Grid,
  Card,
  Chip,
  CardContent,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle as IconClose } from "@fortawesome/free-solid-svg-icons";

import { Utilities } from "../Utilities/Utilities";

export default function FoodCard(props) {
  const ClassFoodIcon = "foodIcon";
  const ClassChip = "chip";

  const removeFoodItem = (e) => {
    let array = props.items;

    let removeIndex = parseInt(
      array.map((item) => item.id).indexOf(parseInt(e.currentTarget.id))
    );

    removeIndex >= 0 && array.splice(removeIndex, 1);

    props.context.setState({ foodItems: array }, function () {
      Utilities.updateCalories(this);
    });
  };

  return (
    <Grid item>
      <Card elevation={2}>
        <CardHeader
          avatar={
            <FontAwesomeIcon
              icon={props.food.icon}
              color={Utilities.getColor(props.food.icon)}
              className={ClassFoodIcon}
            />
          }
          title={props.food.name}
          subheader={
            "at " + props.food.time + " containing " + props.food.kcal + " kcal"
          }
          action={
            <IconButton
              aria-label="remove"
              onClick={removeFoodItem}
              id={props.food.id}
            >
              <FontAwesomeIcon icon={IconClose} id={props.food.id} />
            </IconButton>
          }
        />
        <CardContent>
          {props.food.keywords.map((word) => (
            <Chip
              key={word}
              className={ClassChip}
              label={word.toUpperCase()}
              color="primary"
              clickable={true}
              size="small"
            />
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
}
