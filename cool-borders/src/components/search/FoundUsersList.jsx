import FoundUserLi from "./FoundUserLi";


function FoundUsersList({users}) {

    let displayUsers = users.map(user => {
        return <FoundUserLi key={user._id} user={user} />
    });

    return (
        <ul className=" flex w-2/3 flex-col gap-3 items-center ">
            {displayUsers}
        </ul>
    )
}


export default FoundUsersList;