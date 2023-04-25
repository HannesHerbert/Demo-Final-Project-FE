import { create } from "zustand";


const useUsersStore = create((set, get) => ({
    
    currUser: null,
    setCurrUser: user => set({currUser: user})
}));


export default useUsersStore;