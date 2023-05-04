
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
    const token = useAuthStore(state => state.getToken());
    // State
    const [blogs, setBlogs] = useState([]);
    const [filter, setFilter] = useState('');

    /* Array mit Objekten der Filtermöglichkeiten */
    let optionValues = [
        { label: 'All', value: '' },
        { label: 'Stories', value: 'story' },
        { label: 'Reviews', value: 'review' },
        { label: 'Market', value: 'market' }
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
            // speichere blogs
            setBlogs(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center p-2 w-full h-fit gap-14">
            <div className="self-end">
                <select onChange={e => setFilter(e.target.value)} className="p-1 rounded-md text-white bg-black hover:text-indigo-200 mt-6">

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
                <h3 className="text-white">There aren't any {filter} posts</h3>
            }

            
        </div>
    )
}


export default Blogs;