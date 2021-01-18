import { Color } from "../../../Constants/Constants";
import {
  faUtensils as IconFood,
  faWineGlassAlt as IconDrink,
  faCookieBite as IconSnack,
  faGhost as IconOther,
  faPizzaSlice as IconExtraPizza,
  faAppleAlt as IconExtraApple,
  faBacon as IconExtraBacon,
  faBreadSlice as IconExtraBread,
  faCarrot as IconExtraCarrot,
  faCheese as IconExtraCheese,
  faEgg as IconExtraEgg,
  faFish as IconExtraFish,
  faHotdog as IconExtraHotdog,
  faLemon as IconExtraLemon,
} from "@fortawesome/free-solid-svg-icons";
import { isSameDay } from "date-fns";
import { GreenTheme, OrangeTheme, RedTheme } from "../../../Theme/Theme";

class Utilities {
  static getIcon = (type, name) => {
    name = name.toLowerCase().trim();
    type = type.toLowerCase().trim();

    // Special food that has own icons
    if (type && type === "food") {
      if (name.includes("apple")) return IconExtraApple;
      if (name.includes("bacon")) return IconExtraBacon;
      if (name.includes("bread")) return IconExtraBread;
      if (name.includes("carrot")) return IconExtraCarrot;
      if (name.includes("cheese")) return IconExtraCheese;
      if (name.includes("egg")) return IconExtraEgg;
      if (name.includes("fish")) return IconExtraFish;
      if (name.includes("hotdog")) return IconExtraHotdog;
      if (name.includes("lemon")) return IconExtraLemon;
      if (name.includes("pizza")) return IconExtraPizza;
    }

    // Otherwise default to category icon
    if (type === "food") return IconFood;
    if (type === "drink") return IconDrink;
    if (type === "snack") return IconSnack;
    return IconOther;
  };

  static getColor = (icon) => {
    switch (icon) {
      case IconExtraApple: // Fallthrough
      case IconExtraBacon:
        return Color.RED;

      case IconExtraBread: // Fallthrough
      case IconExtraCheese: // Fallthrough
      case IconExtraLemon:
        return Color.YELLOW;

      case IconExtraCarrot: // Fallthrough
      case IconExtraHotdog: // Fallthrough
      case IconExtraPizza:
        return Color.ORANGE;

      case IconExtraFish:
        return Color.BLUE;
      case IconFood:
        return Color.GREEN;
      case IconDrink:
        return Color.BLUE;
      case IconSnack:
        return Color.BROWN;
      default:
        return Color.BLACK;
    }
  };

  static getTimeFromEpoch = (time) => {
    let date = new Date(time).toTimeString().split(" ")[0];
    date = date.substr(0, date.lastIndexOf(":"));
    return date;
  };

  static getCalories = (context) => {
    let calories = 0;
    for (let food of context.state.foodItems) {
      if (isSameDay(food.date, context.state.selectedDate)) {
        calories += parseInt(food.kcal);
      }
    }
    return calories;
  };

  static updateCalories = (context) => {
    let calories = 0;
    for (let item of context.state.foodItems) {
      if (isSameDay(item.date, context.state.selectedDate)) {
        calories += parseInt(item.kcal);
      }
    }

    context.setState((prevState) => ({
      User: { ...prevState.User, currentKcalIntake: calories },
    }));
  };

  static getThemeFromPercentage = (percentage) => {
    if (percentage >= 90) {
      return RedTheme;
    } else if (percentage >= 70) {
      return OrangeTheme;
    } else {
      return GreenTheme;
    }
  };
}

class UserUtilities {
  static getPercentageOfWeight = (context) => {
    let difference =
      context.state.User.startWeight - context.state.User.targetWeight;
    let differenceCurrent =
      context.state.User.currentWeight - context.state.User.targetWeight;
    return Math.min(differenceCurrent / difference, 1) * 100;
  };

  static getPercentageOfWeightText = (context) => {
    let difference =
      context.state.User.startWeight - context.state.User.targetWeight;
    let differenceCurrent =
      context.state.User.currentWeight - context.state.User.targetWeight;
    return Math.max(differenceCurrent / difference, 0) * 100;
  };

  static getPercentageOfKcal = (context) => {
    return (
      Math.min(
        context.state.User.currentKcalIntake /
          context.state.User.targetKcalIntake,
        1
      ) * 100
    );
  };
}

export default Utilities;
export { Utilities, UserUtilities };
