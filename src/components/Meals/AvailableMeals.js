import React, { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem';



const AvailableMeals = () => {
  const [meals,setMeals] = useState([]);
  const [isLoading,setIsLoading] = useState(true); // for loading till meals are loading
  const [error,setError] = useState(); // for error while fetch request

  useEffect(() => {

    const fetchMeals = async () => {
      let response = await fetch('https://react-auth-8349e-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json')
      
      if(!response.ok)
      {
        throw new Error('Something went wrong!');
      }

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
      setIsLoading(false);
    }
    
      fetchMeals().catch(error =>{
      setIsLoading(false);
      setError(error.message);
    });
    
  },[]);

  if(isLoading){
    return (
      <section className={classes.MealsLoading}>
        <p>Loading Meals...</p>
      </section>
    );
  }

  if(error)
  {
    return (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    );
  }

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