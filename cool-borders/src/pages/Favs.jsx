import { useEffect, useState } from "react";
import usePostsStore from "../store/usePostsStore";
import Post from "../components/post/Post";
import useAuthStore from "../store/useAuthStore";
import axios from "axios";


function Favs() {
  const fetchFavorites = usePostsStore(state => state.fetchFavorites);
  const favorites = usePostsStore(state => state.favorites);

  useEffect(() => {
    fetchFavorites();
  }, []);


  return (
    /* Render favorites */
    <div className="flex flex-col justify-center items-center p-2 w-full h-fit gap-14">

      {favorites.map(fav => {
        return <Post key={fav._id} post={fav} fetchFavoritesCallback={fetchFavorites} />
      })}

    </div>
  );
}

export default Favs;
