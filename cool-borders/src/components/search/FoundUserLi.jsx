import { Link } from "react-router-dom";
import useUserSearchStore from "../../store/useUserSearchStore";





function FoundUserLi({user}) {

    const setSearchUser = useUserSearchStore(state => state.setSearchUser)

    function handler() {
        setSearchUser(user);
        console.log(user);
    }
    
    return (
        <li
            onClick={handler}
            className="bg-gray-500 px-3 py-2 w-3/5 text-center rounded-2xl hover:bg-gray-700 hover:text-gray-200 transition-colors duration-200 cursor-pointer shadow-xl"
        >
            <Link to={`/users/${user.username}`} > {user.username}</Link>

        </li>
    );
}


export default FoundUserLi;
