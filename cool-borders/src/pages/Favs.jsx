import { useEffect, useState } from "react";
import Favorite from "../components/fav/Favourite";
import useFavoritesStore from "../store/useFavoritesStore";


function Favs() {
  const fetchFavorites = useFavoritesStore(state => state.fetchFavorites);
  const favorites = useFavoritesStore(state => state.favorites);

  useEffect(() => {
    fetchFavorites();
  }, []);


  return (
    /* Render favorites */
    <div className="flex flex-col justify-center items-center p-2 w-full h-fit gap-14">

      {favorites.map(fav => {
        return <Favorite key={fav._id} fav={fav} />
      })}

    </div>
  );
}

export default Favs;
