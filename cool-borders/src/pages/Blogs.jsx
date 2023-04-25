
import { Link } from "react-router-dom";
import PrivateRoute from "../services/PrivateRoute";
import { HiUserCircle } from 'react-icons/hi';
import { RiAlarmWarningLine } from 'react-icons/ri';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiFillStar } from 'react-icons/ai';
import { useState } from "react";
import ImageSlider from '../components/ImageSlider.jsx';
import { SliderData } from '../components/SliderData.js';
import useAuthStore from "../store/useAuthStore.js";

function Blogs(props) {
    const user = useAuthStore(state => state.user)

    /* Array mit Objekten der Filtermöglichkeiten */
    let optionValues = [
        { label: 'Stories', value: 'Stories' },
        { label: 'Reviews', value: 'Reviews' },
        { label: 'Market', value: 'Market' },
        { label: 'Friends', value: 'Friends' },
        { label: 'All', value: 'All' }
    ];

    let [filter, setFilter] = useState('Stories');

    let handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <div className="flex flex-col justify-center items-center ">
            <div className="self-start">
                <select onChange={handleFilterChange} className="p-1 rounded-md text-white bg-black hover:text-indigo-200 mt-6">
                    <option value="Filter: "> - Blog - </option>

                    {optionValues.map((filter) => (
                        <option key={filter.value}  value={filter.value} className="rounded-md p-2">{filter.label}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col justify-between items-center w-full md:w-3/4 h-full mt-2 p-3 rounded-md">

                <ImageSlider slides={SliderData} />


                <section className="text-justify flex flex-col mt-6 mb-20">
                    <div className="flex flex-row justify-between gap-2 mb-3">
                        <div className="flex items-center">
                            <HiUserCircle className="text-4xl text-white" />
                            <h3 className="ml-2 text-white text-xs font-bold ">{user.fullname}</h3>

                        </div>
                    
                        <span className=" text-xs text-red-500">{filter}</span>
                        
                    </div>
                    
                    <p className="text-xs md:text-sm text-gray-400 ml-1">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum nobis, voluptas dignissimos culpa ullam commodi
                            magnam numquam. Recusandae sed quod adipisci ipsa illum odit aliquid! Eius ipsam explicabo modi esse tempora.
                    </p>
                   

                    <div className="flex flex-row justify-between items-center mt-4 ml-1">
                        <AiFillStar className="text-2xl self-center text-gray-100 hover:text-yellow-400 active:text-yellow-400 cursor-pointer" />
                        <RiAlarmWarningLine className=" text-2xl text-gray-100  hover:text-red-600 active:text-red-600 self-end cursor-pointer" />
                    </div>
                </section>

            </div>

            

            <div className="flex flex-col justify-between items-center w-full md:w-3/4 h-full mt-2 p-3 rounded-md">
                <ImageSlider slides={SliderData} />
                <section className="text-justify flex flex-col mt-6 mb-20">
                    <div className="flex flex-row justify-between gap-2 mb-3">
                        <div className="flex items-center">
                            <HiUserCircle className="text-4xl text-white" />
                            <h3 className="ml-2 text-white text-xs font-bold ">{user.fullname}</h3>

                        </div>
                    
                        <span className=" text-xs text-red-500">{filter}</span>
                        
                    </div>
                    
                    <p className="text-xs md:text-sm text-gray-400 ml-1">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum nobis, voluptas dignissimos culpa ullam commodi
                            magnam numquam. Recusandae sed quod adipisci ipsa illum odit aliquid! Eius ipsam explicabo modi esse tempora.
                    </p>
                   

                    <div className="flex flex-row justify-between items-center mt-4 ml-1">
                        <AiFillStar className="text-2xl self-center text-gray-100 hover:text-yellow-400 active:text-yellow-400 cursor-pointer" />
                        <RiAlarmWarningLine className=" text-2xl text-gray-100  hover:text-red-600 active:text-red-600 self-end cursor-pointer" />
                    </div>
                </section>

            </div>
        </div>
    )
}


export default Blogs;