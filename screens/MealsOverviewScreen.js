import { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
import MealsList from '../components/MealsList/MealsList';
import { MEALS, CATEGORIES } from '../data/dummy-data';

// import { useRoute } from '@react-navigation/native';

export default function MealsOverviewScreen({ route, navigation }) {
  // const route=useRoute()
  //   route.params
  // alternative way
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((meal) => {
    return meal.categoryIds.indexOf(catId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTile = CATEGORIES.find(
      (category) => category.id === catId
    ).title;
    navigation.setOptions({ title: categoryTile });
  }, [catId, navigation]);

  return <MealsList items={displayedMeals} />;
}

const styles = StyleSheet.create({});
