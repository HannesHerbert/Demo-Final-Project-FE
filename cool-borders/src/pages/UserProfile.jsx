import {useState } from "react";
import UserUserEdit from "../components/user/UserUserEdit.jsx";
import useAuthStore from "../store/useAuthStore.js";

import AdminDashboard from "../components/admin/AdminDashboard";
import AuthorDashboard  from "../components/admin/AdminDashboard";
import UserPostsContainer from "../components/user/UserPostsContainer.jsx";


function UserProfile() {
    // todo Store mit Zustand schreiben
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const user = useAuthStore(state => state.user);
    const logout = useAuthStore(state => state.logout);


    function getDateString(date) {

        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const dayOfMonth = dateObj.getDate();
    
        const dateString = `${dayOfMonth < 10 ? 0 : ""}${dayOfMonth}.${month < 10 ? 0 : ""}${month}.${year}`
    
        return dateString
    };

    function getTimeString(date) {

        const dateObj = new Date(date);
        const hour = dateObj.getHours();
        const min = dateObj.getMinutes();
        const sec = dateObj.getSeconds();

        const timeString = `${hour < 10 ? 0 : ""}${hour}:${min < 10 ? 0 : ""}${min}:${sec < 10 ? 0 : ""}${sec}`

        return timeString
    };



    return (
        <>

            {isAdmin && <AdminDashboard />}
            {isAuthor && <AuthorDashboard />}

            {isEdit === false ?
                <div className="flex flex-col-reverse lg:flex-row  gap-10 mt-10">
                    <UserPostsContainer userId={user._id} />

                    <div className="bg-gray-900 pb-6 w-full  justify-center items-center overflow-hidden lg:max-w-sm rounded-lg mx-auto  ">
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
                            Last login:  {`${getDateString(user.lastLogin)} - ${getTimeString(user.lastLogin)}`}
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
                                className="mt-4 w-40 bg-indigo-700 font-bold hover:bg-orange-700 text-orange-200  py-2  rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-orange-600  hover:-translate-y-1 hover:scale-110 duration-300"
                            >Edit</button>

                            <button 
                                className="mt-4 w-40 bg-indigo-700 font-bold hover:bg-orange-700 text-orange-200  py-2  rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-orange-600  hover:-translate-y-1 hover:scale-110 duration-300"
                                onClick={logout}
                            >
                                Log out
                            </button>

                        </div>
                    </div>

                </div>

                :

                <UserUserEdit userToEdit={user} setIsEdit={setIsEdit}/>
            }
            
        </>
    )
}

export default UserProfile;