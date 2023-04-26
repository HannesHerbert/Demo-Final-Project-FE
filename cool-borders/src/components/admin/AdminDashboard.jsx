
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiFillStar } from 'react-icons/ai';
import { HiUserCircle } from 'react-icons/hi';
import UserManagement from './UserManagement';
import ReportManagement from './ReportManagement';
import CreateArticle from './CreateArticle';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


function AdminDashboard() {

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

            <div className="">

                <button className='m-2 md:m-10 text-xs md:text-lg w-20 md:w-40 p-2 bg-orange-600 hover:bg-orange-700 text-white rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-orange-600  hover:-translate-y-1 hover:scale-110 duration-300'
                    name='article'
                    onClick={changeDisplay}
                >
                    Create Article
                </button>

                <button className='m-2 md:m-10 text-xs md:text-lg w-20 md:w-40 p-2 bg-orange-600 hover:bg-orange-700 text-white rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-orange-600  hover:-translate-y-1 hover:scale-110 duration-300'
                    name='reports'
                    onClick={changeDisplay}
                >
                    Manage Reports
                </button>

                <button className='m-2 md:m-10 text-xs md:text-lg w-20 md:w-40 p-2 bg-orange-600 hover:bg-orange-700 text-white rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-orange-600  hover:-translate-y-1 hover:scale-110 duration-300'
                    name='users'
                    onClick={changeDisplay}
                >
                    Manage Users
                </button>

            </div>

            <div className="flex flex-col justify-center items-center  w-full md:w-3/4 h-full mt-2 p-3 bg-gray-900 rounded">

                {display}

            </div>


            {/* <div className="flex flex-col justify-center items-center  w-full md:w-3/4 h-full mt-2 p-3 bg-gray-900 rounded">

                <div className="self-end">

                    <HiUserCircle className="text-2xl md: text-4xl mb-4" />
                </div>

                <img
                    className='md:w-3/4 rounded'
                    src="data:image/jpeg;base64,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"
                    alt="photo"
                />

                <section className="text-justify flex flex-col">
                    <p className='text-xs md:text-sm m-2'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum nobis, voluptas dignissimos culpa ullam commodi
                        magnam numquam. Recusandae sed quod adipisci ipsa illum odit aliquid! Eius ipsam explicabo modi esse tempora
                        perspiciatis odit rerum, fugiat numquam placeat architecto facere, doloribus sapiente ea eligendi eveniet cupiditate
                        debitis inventore. Nostrum, eos numquam.
                    </p>
                </section>

                <div className='flex flex-row justify-between items-center'>
                    <button className='bg-gray-500 p-2 w-20 rounded text-xs md:text-sm m-2 md:m-5'>Confirm</button>
                    <button className='bg-gray-500 p-2 w-20 rounded text-xs md:text-sm m-2 md:m-5'>Edit</button>
                    <button className='bg-gray-500 p-2 w-20 rounded text-xs md:text-sm m-2 md:m-5'>Delete</button>
                </div>

            </div> */}

        </div>

    )
}


export default AdminDashboard;