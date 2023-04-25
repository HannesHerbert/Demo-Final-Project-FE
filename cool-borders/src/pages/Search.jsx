import FoundUsersList from "../components/search/FoundUsersList";
import FindUsersForm from "../components/search/FindUsersForm";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/debounce";
import useAuthStore from "../store/useAuthStore";
import axios from "axios";


function Search() {
    // token
    const token = useAuthStore(state => state.getToken());
    // State
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    // custom hooks 
    const debounced = useDebounce(search);

    useEffect(() => {
        if (search.length > 0) {
            fetchUsers(debounced)
        } else {
            setUsers([]);
        }
    }, [debounced]);

    async function fetchUsers(username) {
        try {
            let resp = await axios.get('http://localhost:8080/protected/searchuser/' + username, {
              headers: {
                'Authorization': `Bearer ${token}`
              }  
            });
            console.log(resp.data);
            setUsers(resp.data.users);
        } catch (error) {
          console.log(error);
        } 
    }
    

    return (
        <div className="container h-full flex flex-col items-center gap-10 ">

            <FindUsersForm setSearch={setSearch} search={search} />

            <FoundUsersList users={users} />

        </div>
    )
}



export default Search;