import useUsersStore from "../store/useUsersStore";




function UserInfo() {
    const currUser = useUsersStore(state => state.currUser);
    

    return (
       <>
         {currUser &&
            <div className="container w-2/3 mx-auto  flex flex-col min-h-full justify-center text-white ">

                <div className="relative shadow mx-auto h-36 w-36 my- border-white rounded-full overflow-hidden border-4 ">
                    <img className="object-cover w-full h-full" src={currUser.image} alt="" />
                </div>

                
                <div className="mt-16 bg-gray-900 px-5 py-10 rounded-3xl flex flex-col justify-around container gap-5 md:flex-row">
                    
                    <div className="flex flex-col ">
                        <h5 className="font-bold text-lg  text-gray-500 text-center mb-5">Rider info</h5>

                        <p className="text-gray-500 text-center">username</p>
                        <span className="text-lg text-center font-semibold mb-4">
                            {currUser.username}
                        </span>

                        <p className="text-gray-500 text-center">full name</p>
                        <span className="text-lg text-center font-semibold mb-4">
                            {currUser.fullname}
                        </span>

                        <p className="text-gray-500 text-center">email</p>
                        <span className="text-lg text-center font-semibold mb-4">
                            {currUser.email}
                        </span>

                        <p className="text-gray-500 text-center">from</p>
                        <span className="text-lg text-center font-semibold mb-4">
                            {currUser.city}
                        </span>

                        <p className="text-gray-500 text-center">date of birth</p>
                        <span className="text-lg text-center font-semibold mb-4">
                            {currUser.birthday}
                        </span>
                    </div>

                    {/* Description */}
                    {currUser.description && 
                        <>
                            
                            <div className="flex flex-col ">
                                <h5 className="font-bold text-lg text-gray-500 text-center mb-5">Rider Description</h5>

                                <p className="text-gray-500 text-center">Stance</p>
                                <span className="text-lg text-center font-semibold mb-4">
                                    {currUser.description.prefStance}
                                </span>

                                <p className="text-gray-500 text-center">Fav locations</p>
                                <span className="text-lg text-center font-semibold mb-4">
                                    {currUser.description.favLocations}
                                </span>

                                <p className="text-gray-500 text-center">Riding style</p>
                                <span className="text-lg text-center font-semibold mb-4">
                                     {currUser.description.style}
                                </span>
                                
                                <p className="text-gray-500 text-center">Equipment</p>
                                <span className="text-lg text-center font-semibold mb-4">
                                     {currUser.description.equipment}
                                </span>

                                <p className="text-gray-500 text-center">About me </p>
                                <span className="text-lg text-center font-semibold mb-4">
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