import classes from "./MealsSummary.module.css";

const MealSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Extremely delicious Meals spiced by Aisha</h2>
      <p>
        Select from our cabins of your favourite meals and enjoy delicious and
        mind blowing lunch and dinner with your family.
      </p>
      <p>
        All our meals are prepared with quality and healthy{" "}
        <strong>ingredients</strong> and you are just in line to enjoy the best
        of experience
      </p>
    </section>
  );
};

export default MealSummary;
