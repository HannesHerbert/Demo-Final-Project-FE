
import { Link } from "react-router-dom";
import PrivateRoute from "../services/PrivateRoute";
import { HiUserCircle } from 'react-icons/hi';
import { RiAlarmWarningLine } from 'react-icons/ri';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiFillStar } from 'react-icons/ai';
import blogImage from '../assets/boardergram-logo.png';
import { useState } from "react";


function Blogs(props) {

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
        <div className="min-h-full">
            <div>
                <select onChange={handleFilterChange} className="p-3 rounded-md bg-black">
                    <option value="Filter: "> - Filter your Blog - </option>

                    {optionValues.map((filter) => (
                        <option value={filter.value} className="rounded-md">{filter.label}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col justify-between items-center w-full h-full mt-2 p-3 bg-black  rounded">

                <div className="self-end flex flex-row justify-between items-center w-full">
                    {/* zeigt den value des ausgewählten Filters */}
                    <span className="text-lg bg-green-500 rounded-md mb-1 p-1">{filter}</span>
                    <div className="flex flex-row justify-center items-center">
                        <h3 className="text-xl mr-3">Author</h3>
                        <HiUserCircle className="text-2xl" />
                    </div>
                </div>

                <div
                    className="mb-3"
                    style={{
                        backgroundImage: `url(${blogImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        width: '300px',
                        height: '250px',
                        borderRadius: '7px'
                    }}>

                    <div className="flex flex-row justify-between items center relative mt-28">
                        <AiOutlineArrowLeft className="text-2xl text-black" />
                        <AiOutlineArrowRight className="text-2xl text-black" />
                    </div>

                </div>


                <section className="text-justify flex flex-col">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum nobis, voluptas dignissimos culpa ullam commodi
                        magnam numquam. Recusandae sed quod adipisci ipsa illum odit aliquid! Eius ipsam explicabo modi esse tempora.
                    </p>

                    <div className="flex flex-row justify-between items-center">
                        <AiFillStar className="text-2xl self-center hover:text-yellow-400 active:text-yellow-400 cursor-pointer" />
                        <RiAlarmWarningLine className=" text-2xl hover:text-red-600 active:text-red-600 self-end cursor-pointer" />
                    </div>
                </section>

            </div>
        </div>
    )
}


export default Blogs;