// CONTEXT API
import { useContext, useLayoutEffect } from 'react';

import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Button,
} from 'react-native';

// REDUX
import { useDispatch, useSelector } from 'react-redux';

import IconButton from '../components/IconButton';
import List from '../components/MealDetail/List';
import Subtitle from '../components/MealDetail/Subtitle';
import MealDetails from '../components/MealDetails';

import { MEALS } from '../data/dummy-data';

// CONTEXT API
// import { FavouritesContext } from '../store/context/favourites-context';

// REDUX
import { addFavourite, removeFavourite } from '../store/redux/favourites';

export default function MealDetailsScreen({ route, navigation }) {
  // CONTEXT API
  // const favouriteMealsCtx = useContext(FavouritesContext);

  // REDUX
  const favouriteMealIds = useSelector((state) => state.favouriteMeals.ids);
  // REDUX
  const dispatch = useDispatch();

  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  // CONTEXT API
  // const mealIsFavourite = favouriteMealsCtx.ids.includes(mealId);

  // REDUX
  const mealIsFavourite = favouriteMealIds.includes(mealId);

  function changeFavouriteStatusHandler() {
    if (mealIsFavourite) {
      // CONTEXT API
      // favouriteMealsCtx.removeFavourite(mealId);

      // REDUX
      dispatch(removeFavourite({ id: mealId }));
    } else {
      // CONTEXT API
      // favouriteMealsCtx.addFavourite(mealId);

      // REDUX
      dispatch(addFavourite({ id: mealId }));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavourite ? 'star' : 'star-outline'}
            color="white"
            onPress={changeFavouriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavouriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailsText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailsText: {
    color: 'white',
  },
  listOuterContainer: { alignItems: 'center' },
  listContainer: {
    width: '80%',
  },
});
