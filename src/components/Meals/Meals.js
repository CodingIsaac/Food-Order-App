import { Fragment } from "react";
import AvailableMeals from "./AvailableMeals";
import MealSummary from "./MealsSummary";

const Meals = () => {
  return (
    <Fragment>
      <MealSummary />
      <AvailableMeals />
    </Fragment>
  );
};
export default Meals;
