import { create } from "zustand";
import axios from "axios";


const useUsersStore = create((set, get) => ({
    
    currUser: null,
    setCurrUser: user => set({currUser: user})
}));


export default useUsersStore;