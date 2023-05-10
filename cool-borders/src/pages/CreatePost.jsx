import axios from "axios";
import { useEffect, useRef, useState } from "react"
import {VscClose} from 'react-icons/vsc';
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";



function CreatePost() {
    const user = useAuthStore(state => state.user);
    const title = useRef('');
    const text = useRef('');
    const [category, setCategory] = useState("");
    const [files, setFiles] = useState([]);
    // const [uploaded, setUploaded] = useState();
    const [urls, setUrls] = useState([]);
    const url = useRef('');
    // navigate
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('newPost: ');

        // let base64Files = files.map(file => {
        //     return
        // });

        let newPost = {
            author: user._id,
            category: category,
            title: title.current.value,
            text: text.current.value,
            files: files,
            imageUrls: urls
        }
        console.log(newPost);
        try {
            let response = await axios.post('http://localhost:8080/protected/post', newPost, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(response);
            navigate('/blogs')
        } catch (error) {
            console.log(error);
        }
    };


    const handleFilesChange = (e) => {

        const file = e.target.files[0];

        const fileReader = new FileReader();

        let baseFile;

        fileReader.onloadend = (evt) => {
            baseFile = fileReader.result;
            console.log(baseFile);
            setFiles(prev => ([
                ...prev,
                baseFile]));
        }

        fileReader.readAsDataURL(file)
    }

    const handleUrlsChange = () => {
        console.log(url.current.value);
        if (url.current.value) {
            setUrls(prev => ([
                ...prev,
                url.current.value]));
        }
    }


    // delete Urls
    function deleteUrlsFromList(i) {
        let newUrls = [...urls];
        newUrls.splice(i, 1);
        setUrls(newUrls);
    }


    // delete files
    // function deleteFilesFromList(i) {
    //     let newFiles = [...files];
    //     newFiles.splice(i, 1);

    //     setFiles(newFiles);
    // }

    useEffect(() => {
        console.log(files);
        console.log(urls);
    }, [files, urls]);


    return (
        <>

            <form onSubmit={handleSubmit} className="mx-auto w-full md:w-1/3 font-sans text-xs md:text-sm shadow-lg shadow-gray-900/50 bg-black rounded-md p-4">

                <div className="mb-4">

                    <input
                        type="text"
                        // value={title}
                        ref={title}
                        // onChange={event => setTitle(event.target.value)}
                        className="bg-slate-900  focus:caret-orange-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Title"
                        required
                    />
                </div>
                <div>
                    <textarea 
                        ref={text}
                        name="content" 
                        id="content" 
                        cols="30" 
                        rows="10" 
                        className=" bg-slate-900  focus:caret-orange-500  shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="Create your content ...">
                            
                    </textarea>
                </div>

                <div className="mb-4">
                    <select value={category} onChange={event => setCategory(event.target.value)} className="bg-slate-900  focus:caret-orange-500  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option>Stories</option>
                        <option>Reviews</option>
                        <option>Market</option>
                    </select>
                </div>

                <div className=" mb-4 w-full">
                    {/* FILES */}
                    <input 
                        type="file" 
                        id="file" 
                        multiple
                        onChange={handleFilesChange} 
                        className="mb-4 bg-gray-400 cursor-pointer" />
                    {/* URLS */}
                    {/* <ul className="flex flex-col gap-5">
                            {files.map((link, i) => {
                                return <li 
                                    className="text-white relative" 
                                    key={i}
                                        >
                                            <span>{i + 1}. {link}</span>

                                            < VscClose
                                                onClick={() => deleteUrlsFromList(i)}
                                                size={24} 
                                                className="hover:text-red-500 absolute top-0 -left-10 cursor-pointer"
                                            />
                                        </li>
                            })}
                        </ul> */}
                    <div className="flex gap-3 items-center">
                        <input 
                        
                            // onChange={handleUrlsChange}
                            ref={url}
                            type="text" 
                            placeholder="Save Url" 
                            className="bg-slate-900  focus:caret-orange-500  shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" />
                            {/* Add button */}
                        <button 
                        type="button"
                            className="text-white bg-green-600 rounded-md h-fit p-3" 
                            onClick={handleUrlsChange}
                            >
                                Add 
                        </button>
                    </div>

                        <ul className="flex flex-col gap-5">
                            {urls.map((link, i) => {
                                return <li 
                                    className="text-white relative" 
                                    key={i}
                                        >
                                            <span>{i + 1}. {link}</span>

                                            < VscClose
                                                onClick={() => deleteUrlsFromList(i)}
                                                size={24} 
                                                className="hover:text-red-500 absolute top-0 -left-10 cursor-pointer"
                                            />
                                        </li>
                            })}
                        </ul>

                </div>
                <div className="flex flex-col items-center">
                    <button type="submit" className="w-full bg-indigo-500 font-bold  text-white py-2 px-4 focus:outline-none focus:shadow-outline ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 rounded-full">Create Post</button>

                </div>

            </form>
        </>

    )
}

export default CreatePost;