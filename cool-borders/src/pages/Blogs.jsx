
import { Link } from "react-router-dom";
import PrivateRoute from "../services/PrivateRoute";
import { HiUserCircle } from 'react-icons/hi';
import { RiAlarmWarningLine } from 'react-icons/ri';
import { AiFillStar } from 'react-icons/ai';
import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore.js";
import axios from "axios";
import Post from "../components/post/Post";

function Blogs() {
    const user = useAuthStore(state => state.user)
    const token = useAuthStore(state => state.getToken());
    // State
    const [blogs, setBlogs] = useState([]);
    const [filter, setFilter] = useState('');

    /* Array mit Objekten der Filtermöglichkeiten */
    let optionValues = [
        { label: 'all', value: '' },
        { label: 'stories', value: 'story' },
        { label: 'reviews', value: 'review' },
        { label: 'market', value: 'market' }
    ];

    useEffect(() => {
        fetchBlogs()
    }, [filter]);

    async function fetchBlogs() {
        try {
            let response = await axios.get('http://localhost:8080/protected/blogs?category=' + filter, {
                headers: {
                    'Authorization': `Bearer ${token}`
                  }  
            });
            console.log(response.data);
            setBlogs(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(filter);
    }, [filter]);

    return (
        <div className="flex flex-col justify-center items-center p-2 w-full h-fit gap-14">
            <div className="self-end">
                <select onChange={e => setFilter(e.target.value)} className="p-1 rounded-md text-white bg-black hover:text-indigo-200 mt-6">
                    {/* <option value="Filter: "> - Blog - </option> */}

                    {optionValues.map((filter) => (
                        <option key={filter.value}  value={filter.value} className="rounded-md p-2">{filter.label}</option>
                    ))}
                </select>
            </div>

            {blogs.length > 0 
            ? 
            blogs.map(blog => {
                return <Post post={blog} key={blog._id} />
            })
            :
            <h3 className="text-white">There aren't  {filter} posts</h3>
            }

            {/* <div className="flex flex-col justify-between items-center w-full md:w-3/4 h-full mt-2 p-3 rounded-md">

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

            </div> */}
        </div>
    )
}


export default Blogs;