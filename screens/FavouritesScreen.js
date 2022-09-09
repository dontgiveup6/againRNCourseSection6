// CONTEXT API
// import { useContext } from 'react';

// REDUX
import { useSelector } from 'react-redux';

import { StyleSheet, Text, View } from 'react-native';
import MealsList from '../components/MealsList/MealsList';
import { MEALS } from '../data/dummy-data';

// CONTEXT API
// import { FavouritesContext } from '../store/context/favourites-context';

export default function FavouritesScreen() {
  // CONTEXT API
  //   const favouriteMealCtx = useContext(FavouritesContext);

  // REDUX
  const favouriteMealsIds = useSelector((state) => state.favouriteMeals.ids);

  const favouriteMeals = MEALS.filter((meal) =>
    // CONTEXT API
    // favouriteMealCtx.ids.includes(meal.id)

    // REDUX
    favouriteMealsIds.includes(meal.id)
  );

  if (favouriteMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>No favourite meals added!</Text>
      </View>
    );
  }

  return <MealsList items={favouriteMeals} />;
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
