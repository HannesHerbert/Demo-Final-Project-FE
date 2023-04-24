import { create } from "zustand";
import axios from "axios";


const useUsersStore = create((set, get) => ({
    users: [],
    searchUsers: async (username) =>{
        const token = localStorage.getItem('token');
        try {
            let resp = await axios.get('http://localhost:8080/protected/searchuser/' + username, {
              headers: {
                'Authorization': `Bearer ${token}`
              }  
            });
            console.log(resp.data);

            set({users: resp.data.users});

            console.log(users);
        } catch (error) {
          console.log(error);
        } 
    },
    setUsers: (users) => set({users: users}),
    
    currUser: null,
    setCurrUser: user => set({currUser: user})
}));


export default useUsersStore;