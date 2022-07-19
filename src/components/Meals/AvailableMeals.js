import React, { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem';



const AvailableMeals = () => {
  const [meals,setMeals] = useState([]);

  useEffect(() => {

    const fetchMeals = async () => {
      let response = await fetch('https://react-auth-8349e-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json')
      let data = await response.json();

      const loadedMeals = [];
      for( const key in data)
      {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
    }
    
    fetchMeals();
  },[]);

  const mealsList = meals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price}/>);

  return (
    <section className={classes.meals}>
        <Card>
            <ul>
            {mealsList}
            </ul>
        </Card>
    </section>
  )
}

export default AvailableMeals