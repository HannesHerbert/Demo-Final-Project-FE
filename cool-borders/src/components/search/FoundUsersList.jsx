import useUsersStore from "../../store/useUsersStore";
import FoundUserLi from "./FoundUserLi";


function FoundUsersList() {
    const foundUsers = useUsersStore(state => state.users);
    


    let users = foundUsers.map(user => {

        return <FoundUserLi key={user._id} user={user} />
        
    });


    return (
        <ul className=" flex w-2/3 flex-col gap-3 items-center ">

            {users }

        </ul>
    )
}


export default FoundUsersList;