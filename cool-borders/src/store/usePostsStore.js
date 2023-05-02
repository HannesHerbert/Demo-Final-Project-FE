import axios from "axios";
import { create } from "zustand";


const usePostsStore = create(set => ({
    favorites: [],
    fetchFavorites: async () => {
        let token = localStorage.getItem('token');
        try {
            let resp = await axios.get('http://localhost:8080/protected/favorites', {
              headers: {
                'Authorization': `Bearer ${token}`
              }  
            });
            
            set({favorites: resp.data.data});

        } catch (error) {
          console.log(error);
        } 
    },
}))


export default usePostsStore;