
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiFillStar } from 'react-icons/ai';
import { HiUserCircle } from 'react-icons/hi';
import UserManagement from './UserManagement';
import ReportManagement from './ReportManagement';
import CreateArticle from './CreateArticle';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuthStore from '../../store/useAuthStore';


function AdminDashboard() {

    const user = useAuthStore(state => state.user);

    const displays = {
        users: <UserManagement/>,
        reports: <ReportManagement/>,
        article: <CreateArticle/>
    }
    const [display, setDisplay] = useState(displays.users);
    

    function changeDisplay(evt) {
        setDisplay(displays[evt.target.name]);
    }


    return (


        <div className='flex flex-col justify-center items-center'>

            <div className="w-full md:w-3/4">

                <button className='w-1/3 text-xs md:text-lg w-20 p-2 bg-orange-600 hover:bg-orange-700 text-white rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-orange-600  hover:-translate-y-1 hover:scale-110 duration-300'
                    name='article'
                    onClick={changeDisplay}
                >
                    Create Article
                </button>

                <button className='w-1/3 text-xs md:text-lg w-20 p-2 bg-orange-600 hover:bg-orange-700 text-white rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-orange-600  hover:-translate-y-1 hover:scale-110 duration-300'
                    name='reports'
                    onClick={changeDisplay}
                >
                    Manage Reports
                </button>

                <button className='w-1/3 text-xs md:text-lg w-20 p-2 bg-orange-600 hover:bg-orange-700 text-white rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-orange-600  hover:-translate-y-1 hover:scale-110 duration-300'
                    name='users'
                    onClick={changeDisplay}
                >
                    Manage Users
                </button>

            </div>

            <div className="flex flex-col justify-center items-center  w-full md:w-3/4 h-full bg-gray-900 rounded">

                {display}

            </div>

        </div>

    )
}


export default AdminDashboard;