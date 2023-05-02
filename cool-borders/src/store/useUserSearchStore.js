import { create } from "zustand";


const useUserSearchStore = create((set, get) => ({
    
    searchUser: null,
    setSearchUser: user => set({searchUser: user})
}));


export default useUserSearchStore;