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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isSameDay, parseISO } from "date-fns";
import { GreenTheme, OrangeTheme, RedTheme } from "../../../Theme/Theme";

class Utilities {
  static getIconSvg = (type, name) => {
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

  static getIcon = (type, name, api) => {
    const ClassFoodIcon = "foodIcon";
    const ClassFoodIconFontAwesome = "foodIconFontAwesome";

    if (!api) {
      var icon = Utilities.getIconSvg(type, name);
      return <FontAwesomeIcon icon={icon} color={Utilities.getColor(icon)} className={ClassFoodIconFontAwesome} />;
    } else {
      return <img src={api.photo.thumb} alt={api.tag_name} className={ClassFoodIcon} />;
    }
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

  static getColorFromType = (type) => {
    if (type === "food") return Color.GREEN;
    if (type === "drink") return Color.BLUE;
    if (type === "snack") return Color.BROWN;
    return Color.BLACK;
  };

  static getTimeFromEpoch = (time) => {
    let date = new Date(time).toTimeString().split(" ")[0];
    date = date.substr(0, date.lastIndexOf(":"));
    return date;
  };

  static getCalories = (context) => {
    let calories = 0;
    for (let food of context.state.user.foodItems) {
      if (isSameDay(parseISO(food.time), context.state.selectedDate)) {
        calories += parseInt(food.calories);
      }
    }
    return calories;
  };

  static updateCalories = (context) => {
    let calories = 0;
    for (let item of context.state.user.foodItems) {
      if (isSameDay(parseISO(item.time), context.state.selectedDate)) {
        calories += parseInt(item.calories);
      }
    }

    context.setState((prevState) => ({
      user: { ...prevState.user, currentCalorieIntake: calories },
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

class HttpUtilities {
  static generateRequestOptions = (bodyObject) => {
    bodyObject = this.convertObjectToLowerCase(bodyObject);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyObject),
    };
    return requestOptions;
  };

  static convertObjectToLowerCase(obj) {
    var key,
      keys = Object.keys(obj);
    var n = keys.length;
    var newobj = {};
    while (n--) {
      key = keys[n];
      newobj[key.toLowerCase()] = obj[key];
    }
    return newobj;
  }
}

class UserUtilities {
  static getPercentageOfWeight = (context) => {
    let difference = context.state.user.startWeight - context.state.user.targetWeight;
    let differenceCurrent = context.state.user.currentWeight - context.state.user.targetWeight;
    return Math.min(differenceCurrent / difference, 1) * 100 || 0;
  };

  static getPercentageOfWeightText = (context) => {
    let difference = context.state.user.startWeight - context.state.user.targetWeight;
    let differenceCurrent = context.state.user.currentWeight - context.state.user.targetWeight;
    return Math.max(differenceCurrent / difference, 0) * 100 || 0;
  };

  static getPercentageOfCalories = (context) => {
    return Math.min(context.state.user.currentCalorieIntake / context.state.user.targetCalorieIntake, 1) * 100;
  };
}

export default Utilities;
export { Utilities, UserUtilities, HttpUtilities };
