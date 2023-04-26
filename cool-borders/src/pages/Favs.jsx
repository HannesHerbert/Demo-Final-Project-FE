import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import Favorite from "../components/fav/Favourite";
import axios from "axios";


function Favs() {
  const token = useAuthStore(state => state.getToken());
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites()
  }, []);

  let displayFavorites = favorites.map(fav => {
    return <Favorite key={fav._id} fav={fav} />
  });

  async function fetchFavorites() {

      try {
          let resp = await axios.get('http://localhost:8080/protected/favorites', {
            headers: {
              'Authorization': `Bearer ${token}`
            }  
          });
          console.log(resp.data.data);
          setFavorites(resp.data.data)

      } catch (error) {
        console.log(error);
      } 
  }


  return (
    <div className="flex flex-col justify-center items-center p-2 w-full h-fit gap-14">
      {displayFavorites}
    </div>
  );
}

export default Favs;
