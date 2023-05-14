import axios from "axios";
import { create } from "zustand";


const usePostsStore = create((set, get) => ({
    favorites: [],
    fetchFavorites: async () => {
        let token = localStorage.getItem('token');
        try {
            let resp = await axios.get('http://localhost:8080/protected/favorites/0', {
              headers: {
                'Authorization': `Bearer ${token}`
              }  
            });
            
            set({favorites: resp.data.data});

        } catch (error) {
          console.log(error);
        } 
    },
    setFavorites: (favs) => set({favorites: favs})
    // fetchFavorites: async () => {
    //   let token = localStorage.getItem('token');
    //   // hole favs
    //   let favs = get().favorites;

    //   try {
    //     let resp = await axios.get('http://localhost:8080/protected/favorites/' + favs.length, {
    //       headers: {
    //         'Authorization': `Bearer ${token}`
    //       }  
    //     });
    //     // speichere favorites in state
    //     console.log(resp.data.data);
  
    //     if (favs.length > 0) {
    //       set({favorites: [...favs, ...resp.data.data]});
    //     } else {
    //       set({favorites: resp.data.data})
    //     }
  
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
}))


export default usePostsStore;