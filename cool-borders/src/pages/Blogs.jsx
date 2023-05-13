import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore.js";
import axios from "axios";
import Post from "../components/post/Post";
import { useInView } from 'react-intersection-observer';


function Blogs() {
    const token = useAuthStore(state => state.getToken());
    // State
    const [blogs, setBlogs] = useState([]);
    const [filter, setFilter] = useState('');
    // LAZY LOADING....
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 1,
    });

    // wenn trigger-div inView === true dann fetche neue posts
    useEffect(() => {
    
        if (inView && !filter) fetchBlogs(blogs.length);

    }, [inView]);

    useEffect(() => {

        if (filter.length > 0) {
            fetchBlogs(0);
        } else {
            fetchBlogs(blogs.length);
        }
        
    }, [filter]);

    /* Array mit Objekten der Filtermöglichkeiten */
    let optionValues = [
        { label: 'All', value: '' },
        { label: 'Stories', value: 'story' },
        { label: 'Reviews', value: 'review' },
        { label: 'Market', value: 'market' }
    ];



    async function fetchBlogs(skip) {
        try {
            let response = await axios.get('http://localhost:8080/protected/blogs?category=' + filter + '&skip=' + skip, {
                headers: {
                    'Authorization': `Bearer ${token}`
                  }  
            });
            console.log(response.data.data);

            // Check ob blogs hat resp datas
            let isObjFetched = false;

            blogs.forEach(blog => {
                response.data.data.forEach(resObj => {
                    if (blog._id === resObj._id) {
                        isObjFetched = true;
                    }
                })

            });

            // speichere blogs
            if (blogs.length > 0 && !filter && !isObjFetched) {
                setBlogs([...blogs, ...response.data.data]);
            } else {
                setBlogs(response.data.data)
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="relative flex flex-col justify-center items-center p-2 w-full h-fit gap-14">
            <div className="self-end sticky top-20 right-5">
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

            {/* TRIGGER DIV */}
            <div ref={ref} className="w-full h-10 text-3xl text-white font-bold text-center ">The end</div>
            
        </div>
    )
}


export default Blogs;