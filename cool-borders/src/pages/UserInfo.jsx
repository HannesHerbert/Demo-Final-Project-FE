import useUsersStore from "../store/useUsersStore";




function UserInfo() {
    const currUser = useUsersStore(state => state.currUser);


    return (
       <>
         {currUser &&
            <div className="container w-2/3 mx-auto  p-5 flex flex-col h-full justify-center text-white">

                <div className="relative shadow mx-auto h-24 w-24 my- border-white rounded-full overflow-hidden border-4">
                    <img className="object-cover w-full h-full" src={currUser.image} alt="" />
                </div>

                
                <div className="mt-16 flex justify-between container">
                    
                    <div className="flex flex-col mt-5">
                        <h5 className="font-bold text-lg mt-10 text-gray-500 text-center mb-5">Rider info</h5>

                        <p className="text-gray-700 text-center">username</p>
                        <span className="text-lg text-center font-semibold ">
                            {currUser.username}
                        </span>

                        <p className="text-gray-700 text-center">full name</p>
                        <span className="text-lg text-center font-semibold ">
                            {currUser.fullname}
                        </span>

                        <p className="text-gray-700 text-center">email</p>
                        <span className="text-lg text-center font-semibold ">
                            {currUser.email}
                        </span>

                        <p className="text-gray-700 text-center">from</p>
                        <span className="text-lg text-center font-semibold ">
                            {currUser.city}
                        </span>

                        <p className="text-gray-700 text-center">date of birth</p>
                        <span className="text-lg text-center font-semibold ">
                            {currUser.birthday}
                        </span>
                    </div>

                    {/* Description */}
                    {currUser.description && 
                        <>
                            
                            <div className="flex flex-col mt-5">
                                <h5 className="font-bold text-lg mt-10 text-gray-500 text-center">Rider Description</h5>

                                <p className="text-gray-700 text-center">Stance</p>
                                <span className="text-lg text-center font-semibold ">
                                    {currUser.description.prefStance}
                                </span>

                                <p className="text-gray-700 text-center">Fav locations</p>
                                <span className="text-lg text-center font-semibold ">
                                    {currUser.description.favLocations}
                                </span>

                                <p className="text-gray-700 text-center">Riding style</p>
                                <span className="text-lg text-center font-semibold ">
                                     {currUser.description.style}
                                </span>
                                
                                <p className="text-gray-700 text-center">Equipment</p>
                                <span className="text-lg text-center font-semibold ">
                                     {currUser.description.equipment}
                                </span>

                                <p className="text-gray-700 text-center">About me </p>
                                <span className="text-lg text-center font-semibold ">
                                     {currUser.description.text}
                                </span>
                            </div>
                        </>
                    }

                </div>
            </div>
        }
       </>

    )
}


export default UserInfo;