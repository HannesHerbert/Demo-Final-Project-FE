import { Link, Navigate } from "react-router-dom";
import useUsersStore from "../../store/useUsersStore";





function FoundUserLi({user}) {

    const setCurrUser = useUsersStore(state => state.setCurrUser)


    
    return (
        <li
            onClick={() => setCurrUser(user)}
            className="bg-gray-500 px-3 py-2 w-3/5 text-center rounded-2xl hover:bg-gray-700 hover:text-gray-200 transition-colors duration-200 cursor-pointer shadow-xl"
        >
            <Link to={`/users/${user.username}`} > {user.username}</Link>

        </li>
    );
}


export default FoundUserLi;
