import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { VscClose } from 'react-icons/vsc';
import { GrAdd } from 'react-icons/gr';
import useAuthStore from "../store/useAuthStore";
import useNotificationStore from "../store/useNotificationStore";
import urlValidator from 'url-validator';
import Post from "../components/post/Post";
import { useNavigate } from "react-router-dom";


function CreatePost() {

    const token = useAuthStore(state => state.getToken());
    const user = useAuthStore(state => state.user);
    const isAdmin = useAuthStore(state => state.isAdmin());
    const navigate = useNavigate();
    const [category, setCategory] = useState('story');
    const [files, setFiles] = useState([]);
    const [urls, setUrls] = useState([]);
    const titleInputRef = useRef('');
    const textInputRef = useRef('');
    const urlInputRef = useRef('');
    const fileInputRef = useRef();

    const [newPost, setNewPost] = useState({
        isCreate: true,
        author: user,
        category: category,
        title: titleInputRef.current.value,
        text: textInputRef.current.value,
        images: urls,
        comments: [],
    })

    // Notification Handler function
    const notificationHandler = useNotificationStore(state => state.notificationHandler);
    // Wenn die Daten zum Server korrekt gesendet sind, wird ein Alert mit Success erzeugt
    function alertSuccessHandler(msg) {
        notificationHandler('success', msg)
    };
    // Wenn bei register ein Fehler, wird ein Alert mit Fehlermeldung erzeugt
    function alertFailHandler(msg) {
        notificationHandler('fail', msg)
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // const newPost = new FormData();
        // newPost.append('author', user._id);
        // newPost.append('category', category);
        // newPost.append('title', titleInputRef.current.value);
        // newPost.append('text', textInputRef.current.value);
        // newPost.append('url', urls);

        // files.forEach((file, index) => {
        //     newPost.append('files', file)
        // })

        // console.log(newPost.getAll('files'));

        const newPost = {
            category: category,
            title: titleInputRef.current.value,
            text: textInputRef.current.value,
            urls: urls,
            files: files
        }

        try {
            let response = await axios.post('http://localhost:8080/protected/post', newPost, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            alertSuccessHandler('New post created')
            navigate('/blogs')
        } catch (error) {
            console.log(error);
            alertFailHandler(error.message)
        }
    };


    const addToFiles = async () => {
        const inputFiles = fileInputRef.current.files;
        const inputFilesList = Array.from(inputFiles);
        const fileObjArr = await Promise.all(inputFilesList.map(async (file) => {
            const baseStr = await fileToBaseStr(file);
            const fileName = file.name.substring(0, file.name.lastIndexOf('.'));
            const fileObj = {
                baseStr: baseStr,
                fileName: fileName
            };
            return fileObj;
        }));
        setFiles([...files, ...fileObjArr]);
    };


    async function fileToBaseStr(file) {

        const fileReader = new FileReader();

        const baseStr = await new Promise((resolve, reject) => {
            fileReader.onloadend = (evt) => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (evt) => {
                reject(evt);
            };
            fileReader.readAsDataURL(file);
        });

        return baseStr;
    };


    const handleUrlsChange = () => {
        // Teste auf gültige URL
        if (urlValidator(urlInputRef.current.value)) {

            if (urlInputRef.current.value) {
                setUrls(prev => ([
                    ...prev,
                    urlInputRef.current.value]));
            };
            alertSuccessHandler('Added URL')
        } else {
            alertFailHandler('Invalid URL')
        }
    };


    // delete Urls
    function deleteUrlsFromList(i) {
        let newUrls = [...urls];
        newUrls.splice(i, 1);
        setUrls(newUrls);
    };


    // delete files
    function deleteFilesFromList(i) {
        let newFiles = [...files];
        newFiles.splice(i, 1);
        setFiles(newFiles);
    };


    useEffect(() => {
        fileInputRef.current.value = '';

        // Hole base-Formate aus Array
        const baseArr = files.map(file => {
            return file.baseStr
        });

        //Fusioniere beide Arrays
        const fileArr = [...urls, ...baseArr];

        // Übergebe an newPost
        setNewPost({ ...newPost, images: fileArr })
    }, [files]);


    useEffect(() => {
        urlInputRef.current.value = '';

        // Hole base-Formate aus Array
        const baseArr = files.map(file => {
            return file.baseStr
        });

        //Fusioniere beide Arrays
        const fileArr = [...urls, ...baseArr];

        // Übergebe an newPost
        setNewPost({ ...newPost, images: fileArr })
    }, [urls]);


    useEffect(() => {
        setNewPost({ ...newPost, category: category })
    }, [category]);


    function updatePreview(evt) {
        setNewPost({ ...newPost, [evt.target.name]: evt.target.value })
    }


    return (
        <div className="mx-auto w-full md:w-3/4 flex p-4 gap-3">

            <div className="w-2/3">
                <Post post={newPost} />
            </div>

            <form onSubmit={handleSubmit} className="w-1/3 font-sans text-xs md:text-sm shadow-lg shadow-gray-900/50 bg-black rounded-md">

                <div className="mb-4">

                    <input
                        type="text"
                        name="title"
                        ref={titleInputRef}
                        onChange={(evt) => updatePreview(evt)}
                        className="bg-slate-900 shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Title"
                        required
                    />
                </div>
                <div>
                    <textarea
                        ref={textInputRef}
                        name="text"
                        onChange={(evt) => updatePreview(evt)}
                        id="content"
                        cols="30"
                        rows="10"
                        className=" bg-slate-900 shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Create your content ...">

                    </textarea>
                </div>

                <div className="mb-4">
                    <select defaultValue={category} onChange={(evt) => setCategory(evt.target.value)} className="bg-slate-900 shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline">
                        <option value={'story'}>story</option>
                        <option value={'review'}>review</option>
                        <option value={'market'}>market</option>
                        {isAdmin && <option value={'article'}>article</option>}
                    </select>
                </div>

                <div className=" mb-4 w-full">

                    <div className="flex gap-3 items-center mb-2">

                        {/* FILES */}
                        <input
                            type="file"
                            id="file"
                            ref={fileInputRef}
                            multiple
                            className="bg-slate-900 shadow appearance-none border rounded h-10 w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" />

                        {/* Add file button */}
                        <button
                            type="button"
                            onClick={addToFiles}
                            className="bg-green-600 rounded-md h-10 w-10 flex justify-center items-center">
                            <GrAdd />
                        </button>

                    </div>

                    {/* FILES */}
                    <ol className="flex flex-col gap-5 mb-2 list-decimal overflow-hidden">

                        {files.map((file, i) => {
                            return <li className="text-white relative absolute left-10"
                                key={i}
                            >
                                <span>{file.fileName}</span>

                                < VscClose
                                    onClick={() => deleteFilesFromList(i)}
                                    size={24}
                                    className="hover:text-red-500 absolute top-[-2px] -left-10 cursor-pointer"
                                />
                            </li>
                        })}

                    </ol>

                    <div className="flex gap-3 items-center mb-2">
                        <input
                            // onChange={handleUrlsChange}
                            ref={urlInputRef}
                            type="text"
                            placeholder="Save Url"
                            className="bg-slate-900 shadow appearance-none border rounded w-full h-10 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                        {/* Add URL button */}
                        <button type="button" className="text-white bg-green-600 rounded-md h-10 w-10 flex justify-center items-center"
                            onClick={handleUrlsChange}>
                            <GrAdd className="text-white" />
                        </button>
                    </div>

                    <ol className="flex flex-col gap-5 mb-2 list-decimal overflow-hidden">
                        {urls.map((link, i) => {
                            return <li
                                className="text-white relative absolute left-10"
                                key={i}
                            >
                                <span className="">{link}</span>

                                < VscClose
                                    onClick={() => deleteUrlsFromList(i)}
                                    size={24}
                                    className="hover:text-red-500 absolute top-[-2px] -left-10 cursor-pointer z-30"
                                />
                            </li>
                        })}
                    </ol>

                </div>
                <div className="flex flex-col items-center">
                    <button type="submit" className="w-full bg-indigo-500 font-bold text-white py-2 px-4 focus:outline-none focus:shadow-outline rounded-full">Create Post</button>

                </div>

            </form>
        </div>

    )
}

export default CreatePost;