import { createContext, useState } from 'react';

export const FavouritesContext = createContext({
  ids: [],
  addFavourite: (id) => {},
  removeFavourite: (id) => {},
});

export default function FavouritesContextProvider({ children }) {
  const [favouriteMealIds, setFavouriteMealIds] = useState([]);

  function addFavouriteHandler(id) {
    setFavouriteMealIds((currentFavIds) => [...currentFavIds, id]);
  }

  function removeFavouriteHanlder(id) {
    setFavouriteMealIds((currentFavIds) =>
      currentFavIds.filter((mealId) => mealId !== id)
    );
  }

  const valueHandler = {
    ids: favouriteMealIds,
    addFavourite: addFavouriteHandler,
    removeFavourite: removeFavouriteHanlder,
  };

  return (
    <FavouritesContext.Provider value={valueHandler}>
      {children}
    </FavouritesContext.Provider>
  );
}
