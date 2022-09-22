import { useEffect, useState } from "react";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";

// const AISHA_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Burger",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Grilled Fish",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
//   {
//     id: "m5",
//     name: "Singaporean Rice",
//     description: "For fertility and growth",
//     price: 25.99,
//   },
//   {
//     id: "m6",
//     name: "Banga Soup",
//     description: "Strong and Healthy Bones",
//     price: 15.5,
//   },
//   {
//     id: "m7",
//     name: "Amala and Ewedu",
//     description: "Clearer thoughts",
//     price: 10.8,
//   },
// ];
const AvailableMeals = () => {
  const [allMeals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, sethttpError] = useState();
  
  useEffect(() => {
    const fetchMeals = async () => {
     const response = await fetch('https://foodapp-551f3-default-rtdb.firebaseio.com/meals.json');
     
     if (!response.ok) {
      throw new Error('Something Crazy Went Wrong');
     }
     
     const responseData = await response.json();

     const loadedMeals = [];
     for (const key in responseData) {
      loadedMeals.push({
        id:key,
        name: responseData[key].name,
        description:responseData[key].description,
        price: responseData[key].price

      });
     }
     setMeals(loadedMeals);
     setIsLoading(false)

    };
    
      fetchMeals().catch((error) => {
      setIsLoading(false);
      sethttpError(error.message);
    });
 }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Fetching Meals...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    )
  }



  const mealsList = allMeals.map((meal) => (
    <MealItem
      key={meal.id}
    //   meal ={meal}
    id = {meal.id}
      name={meal.name}
       description={meal.description}
       price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
