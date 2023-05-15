import { useEffect, useState } from "react";
import { IoMdSearch } from 'react-icons/io';
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import PostTableRow from "./PostTableRow";
import useDebounce from "../../hooks/debounce";
import useNotificationStore from "../../store/useNotificationStore";



function PostManagement() {

    const token = useAuthStore(state => state.getToken());
    const [searchString, setSearchString] = useState("");
    const [postsArr, setPostsArr] = useState([]);
    const [dirArrow, setDirArrow] = useState(<BsArrowDown className="self-center" />);
    const [sortVal, setSortVal] = useState({ key: "createdAt", upDir: false, isClosed: false })
    const [isInit, setIsInit] = useState(true);
    const debounced = useDebounce(searchString);
    const [isClosed, setIsClosed] = useState(true)

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



    async function getFilteredAndSortedPosts() {

        const sortDir = sortVal.upDir ? -1 : 1

        try {
            const response = await axios.get(`http://localhost:8080/admin/posts`, {
                // ?search=${searchString}&state=${sortVal.isClosed}&sort=${sortVal.key}&dir=${sortDir}
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            setPostsArr(response.data.posts);

            console.log(response.data.posts);

            setDirArrow(sortVal.upDir ? <BsArrowUp className="self-center" /> : <BsArrowDown className="self-center" />)

        } catch (error) {

            console.log(error);
            
            alertFailHandler(error.message);
        }
    };


    useEffect(() => {
        if (isInit) {
            getFilteredAndSortedPosts();
            setIsInit(false);
        }
    }, []);


    useEffect(() => {
        getFilteredAndSortedPosts();
    }, [sortVal, debounced]);


    function updateTable() {
        getFilteredAndSortedPosts()
    };


    function handleSortClick(evt) {
        if (evt.target.name === sortVal.key) {
            setSortVal({ ...sortVal, upDir: !sortVal.upDir })
        } else {
            setSortVal({ ...sortVal, key: evt.target.name, upDir: false })
        }
    };


    function handleSubmit(evt) {
        evt.preventDefault()
        getFilteredAndSortedPosts()
    };


    const postsTable = postsArr.map(post => {

        return (
            <PostTableRow post={post} key={post._id} updateTable={updateTable} />
        )
    });


    let optionValues = [,
        { label: 'Visible', value: false },
        { label: 'Invisible', value: true }
    ];


    const reportSelect = <select onChange={evt => setSortVal({ ...sortVal, isClosed: evt.target.value })}
        className="p-1 absolute right-0 rounded-md text-white bg-black hover:text-indigo-200 justify-self-end"
        defaultValue={sortVal.isClosed ? 'Closed' : 'Open'}>
        {optionValues.map((state, index) => (
            <option key={index} value={state.value} className="rounded-md p-2">{state.label}</option>
        ))}
    </select>


    return (
        <div className="relative container flex flex-col justify-center items-center min-h-full">

            <form method="get" onSubmit={handleSubmit} className="w-xs mx-auto w-full md:w-1/2 flex flex-col md:flex-row justify-center items-center">

                <input
                    type="search"
                    name="search"
                    value={searchString}
                    onChange={(event) => setSearchString(event.target.value)}
                    className="focus:caret-orange-500 shadow  border rounded w-full py-2 px-3 text-orange-500 leading-tight m-3"
                    placeholder='Search for User'
                />

                <button className="w-32 flex justify-center items-center bg-orange-500 font-bold hover:bg-orange-600 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-orange-600 duration-300">
                    <IoMdSearch className="text-2xl" />
                </button>

                {reportSelect}

            </form>

            <div className="w-full relative bg-gray-900 mt-4 table-wrp block h-[60vh] overflow-y-scroll">
                <table className="table-fixed w-full md:text-sm pb-4">
                    <thead className="text-white sticky bg-gray-900 z-50 top-0">
                        <tr>
                            <th className="border-l" colSpan="2">
                                <span className="flex">
                                    <button name="username" onClick={(evt) => handleSortClick(evt)} className="flex align-middle w-full pl-1">
                                        Author
                                    </button>
                                    {sortVal.key === "username" ? dirArrow : null}
                                </span>
                            </th>

                            <th className="border-l" colSpan="2">
                                <span className="flex align-middle pl-1">
                                    Title
                                </span>
                            </th>

                            <th className="border-l" colSpan="1">
                                <span className="flex">
                                    <button name="category" onClick={(evt) => handleSortClick(evt)} className="flex align-middle w-full pl-1">
                                        Category
                                    </button>
                                    {sortVal.key === "category" ? dirArrow : null}
                                </span>
                            </th>

                            <th className="border-l" colSpan="1">
                                <span className="flex">
                                    <button name="created" onClick={(evt) => handleSortClick(evt)} className="flex align-middle w-full pl-1">
                                        created
                                    </button>
                                    {sortVal.key === "created" ? dirArrow : null}
                                </span>
                            </th>

                        </tr>
                    </thead>

                    <tbody className="text-center text-black">
                        {postsTable}
                    </tbody>

                </table>
            </div>

        </div>
    )
}


export default PostManagement;