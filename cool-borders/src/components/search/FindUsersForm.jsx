import useDebounce from "../../hooks/debounce.js";
import * as Styles from "../../services/styles.js";
import useUsersStore from "../../store/useUsersStore";
import { useEffect, useState } from "react";




function FindUsersForm() {
    // Users Store
    const searchUsers = useUsersStore(state => state.searchUsers);
    const setUsers = useUsersStore(state => state.setUsers);
    // State
    const [search, setSearch] = useState('');
    // custom hooks 
    const debounced = useDebounce(search);

    useEffect(() => {
        if (search.length > 0) {
            searchUsers(debounced);
        } else {
            setUsers([]);
        }
        console.log(search);
    }, [debounced]);
    

    return (
        <form className="w-full flex  items-center justify-center gap-8 mt-28">
            <input 
                className={`${Styles.input} w-2/5 text-center`}
                type="text" 
                id="find-user" 
                placeholder="username" 
                value={search} 
                onChange={e => setSearch(e.target.value)}
            />
        </form>
    )
}


export default FindUsersForm;