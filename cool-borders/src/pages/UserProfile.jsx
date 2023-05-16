import { useState } from "react";
import UserUserEdit from "../components/user/UserUserEdit.jsx";
import useAuthStore from "../store/useAuthStore.js";
import axios from "axios";

import AdminDashboard from "../components/admin/AdminDashboard";
import AuthorDashboard from "../components/admin/AdminDashboard";
import UserPostsContainer from "../components/user/UserPostsContainer.jsx";


function UserProfile() {
    // todo Store mit Zustand schreiben
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const user = useAuthStore(state => state.user);
    const logout = useAuthStore(state => state.logout);
    const token = useAuthStore(state => state.getToken());

    async function main() {
        try {
            console.log("get files");
            const resources = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/protected/user/files`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }  
              });
            console.log(resources);
        } catch (error) {
            console.error(error);
        }
    }

    main()


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
                <div className="flex flex-col-reverse  gap-10 mt-10">
                    <UserPostsContainer userId={user._id} />

                    {/* User data */}
                        <div className="flex flex-col gap-14 pb-7  bg-gray-900 w-full lg:max-w-3xl rounded-lg mx-auto text-white shadow-gray-800  shadow-lg">
                            <div>
                                <div className="relative h-40">
                                    <img className="absolute h-full w-full object-cover" src="https://picjumbo.com/wp-content/uploads/snowboards-and-skis-leaning-against-wooden-fence.jpg" alt="" />

                                </div>
                                <div className="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                                    <img className="object-cover w-full h-full" src={user.image} alt="" />

                                </div>
                            </div>
                            {/* USer description */}
                            <div className=" bg-gray-900 px-5 py-10 rounded-3xl flex flex-col justify-around container gap-5 md:flex-row">
                                <div className="flex flex-col ">
                                <h5 className="font-bold text-lg  text-gray-500 text-center mb-5 uppercase">Rider info</h5>

                                <p className="text-gray-500 text-center">username</p>
                                <span className="text-lg text-center font-semibold mb-4">
                                    {user.username}
                                </span>

                                <p className="text-gray-500 text-center">full name</p>
                                <span className="text-lg text-center font-semibold mb-4">
                                    {user.fullname}
                                </span>

                                <p className="text-gray-500 text-center">email</p>
                                <span className="text-lg text-center font-semibold mb-4">
                                    {user.email}
                                </span>

                                <p className="text-gray-500 text-center">from</p>
                                <span className="text-lg text-center font-semibold mb-4">
                                    {user.city}
                                </span>

                                <p className="text-gray-500 text-center">date of birth</p>
                                <span className="text-lg text-center font-semibold mb-4">
                                    {user.birthday}
                                </span>


                            </div>

                            <div className="flex flex-col ">
                                <h5 className="font-bold text-lg text-gray-500 text-center mb-5 uppercase">Rider Description</h5>

                                <p className="text-gray-500 text-center">Stance</p>
                                <span className="text-lg text-center font-semibold mb-4">
                                    {user.description.prefStance}
                                </span>

                                <p className="text-gray-500 text-center">Fav locations</p>
                                <span className="text-lg text-center font-semibold mb-4">
                                    {user.description.favLocations}
                                </span>

                                <p className="text-gray-500 text-center">Riding style</p>
                                <span className="text-lg text-center font-semibold mb-4">
                                    {user.description.style}
                                </span>
                                
                                <p className="text-gray-500 text-center">Equipment</p>
                                <span className="text-lg text-center font-semibold mb-4">
                                    {user.description.equipment}
                                </span>

                                <p className="text-gray-500 text-center">About me </p>
                                <span className="text-lg text-center font-semibold mb-4">
                                    {user.description.text}
                                </span>
                            </div>
                            
                        </div>

                        {/* BUTTONS */}
                        <div className="flex justify-center gap-5">
                            <button
                                onClick={() => setIsEdit(true)}
                                className="px-7 py-2 font-bold rounded-lg text-gray-200 bg-indigo-500 hover:bg-gray-300 hover:text-indigo-600"
                            >Edit</button>

                            <button 
                                className="px-7  py-2 font-bold rounded-lg text-gray-200 bg-red-500 hover:bg-gray-300 hover:text-indigo-600"
                                onClick={logout}
                            >
                                Log out
                            </button>
                        </div>
                        
                                
                    </div>

                </div>

                :

                <UserUserEdit userToEdit={user} setIsEdit={setIsEdit} />
            }

        </>
    )
}

export default UserProfile;