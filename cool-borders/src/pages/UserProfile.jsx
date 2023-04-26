import { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "../components/forms/UserForm.jsx";
import useAuthStore from "../store/useAuthStore.js";

import AdminDashboard from "../components/admin/AdminDashboard";
import AuthorDashboard  from "../components/admin/AdminDashboard";


function UserProfile() {
    // todo Store mit Zustand schreiben
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [isUser, setIsUser] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const user = useAuthStore(state => state.user)


    // todo im authStore gucken ob admin oder author wenn 
    //todo wenn user - navigate zurück / zur fehlerseite
    //todo wenn author - 
    // todo wenn admin - 

    // const isAuthenticated = useAuthStore(state => state.isAuthenticated());
    // console.log(isAuthenticated);

    // useEffect(() => {
    //     if(isEdit === false) {
    //         console.log("get user data");
    //     }
    // }, [isEdit])
console.log(user);

    return (
        <>

            {isAdmin && <AdminDashboard />}
            {isAuthor && <AuthorDashboard />}

            {isEdit === false ?
                <div className="bg-gray-900 pb-6 w-full  justify-center items-center overflow-hidden md:max-w-sm rounded-lg mx-auto shadow-lg shadow-indigo-500/50 ">
                    <div className="relative h-40">
                        <img className="absolute h-full w-full object-cover" src="https://picjumbo.com/wp-content/uploads/snowboards-and-skis-leaning-against-wooden-fence.jpg" alt="" />

                    </div>
                    <div className="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                        <img className="object-cover w-full h-full" src={user.image} alt="" />

                    </div>
                    <div className="mt-16">
                        <p className="text-lg text-center font-semibold text-orange-700">
                            {user.fullname}
                        </p>

                        <p className="text-gray-400 text-center mt-3">
                            Date of Birth: {user.birthday}
                        </p>

                        <p className="text-gray-400 text-center mt-3">
                            Email: {user.email}
                        </p>

                        <p className="text-gray-400 text-center mt-3">
                           Last login:  {user.lastLogin}
                        </p>


                    </div>
                    <div className="mt-8 pt-3 mx-6 border-t flex flex-col items-center ">
                        <div className="text-xs my-1 tracking-wider border px-2 text-orange-700 border-gray-400  hover:text-indigo-200 cursor-default">

                            {user.description && 
                                <>
                                    <p className="text-sm text-gray-600 text-center">
                                        {user.description.prefStance}
                                    </p>
                                    <p className="text-sm text-gray-600 text-center">
                                        {user.description.favLocations}
                                    </p>
                                    <p className="text-sm text-gray-600 text-center">
                                        {user.description.style}
                                    </p>
                                    <p className="text-sm text-gray-600 text-center">
                                        {user.description.equipment}
                                    </p>
                                    <p className="text-sm text-gray-600 text-center">
                                        {user.description.text}
                                    </p>
                                </>
                            }
                        </div>



                        <button
                            onClick={() => setIsEdit(true)}
                            className="mt-4 w-40 bg-orange-900 font-bold hover:bg-orange-700 text-orange-200  py-2  rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-orange-600  hover:-translate-y-1 hover:scale-110 duration-300">Edit</button>
                    </div>
                </div>

                :

                <UserForm setIsEdit={setIsEdit}/>
            }
        </>
    )
}

export default UserProfile;