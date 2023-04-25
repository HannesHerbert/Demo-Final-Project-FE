
import { useEffect, useState } from "react";
import { IoMdSearch } from 'react-icons/io';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";
import UserTableRow from "./UserTableRow";


function UserManagement() {

    // Auth
    const user = useAuthStore(state => state.user);
    const token = useAuthStore(state => state.getToken());

    const [searchString, setSearchString] = useState("")
    const [usersArr, setUsersArr] = useState([]);
    const [isInit, setIsInit] = useState(true);
    const [sortVal, setSortVal] = useState({ key: "username", upDir: false })
    const [dirArrow, setDirArrow] = useState(<BsArrowDown className="self-center" />)


    async function getFilteredAndSortedUsers() {

        const sortDir = sortVal.upDir ? -1 : 1

        try {
            const response = await axios.get(`http://localhost:8080/protected/users?search=${searchString}&sort=${sortVal.key}&dir=${sortDir}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            setUsersArr(response.data.users);

            setDirArrow(sortVal.upDir === true ? <BsArrowUp className="self-center" /> : <BsArrowDown className="self-center" />)

        } catch (error) {

            console.log(error);
            // Display eine Fehlermeldung
            // alertFailHandler(error.response.message);
        }
    }


    useEffect(() => {
        if (isInit) {
            getFilteredAndSortedUsers();
            setIsInit(false);
        }
    }, []);


    useEffect(() => {
        getFilteredAndSortedUsers();
    }, [sortVal, searchString]);


    function handleSortClick(evt) {
        if (evt.target.name === sortVal.key) {
            setSortVal({ key: sortVal.key, upDir: !sortVal.upDir })
        } else {
            setSortVal({ key: evt.target.name, upDir: false })
        }
    };


    function handleSubmit(evt) {
        evt.preventDefault()
        getFilteredAndSortedUsers()
    };


    const userTable = usersArr.map(user => {

        return (
            <UserTableRow user={user} key={user._id} />
        )
    });


    return (

        <div className="container flex flex-col justify-center items-center min-h-full">

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

            </form>

            <div className="flex flex-col justify-center items-center w-full md:w-3/4 bg-gray-900 rounded mt-4 p-4">
                <table className="table-fixed w-full w-full md:text-lg">
                    <thead className="text-white">
                        <tr>
                            <th className=""></th>

                            <th className="border-l" colSpan="2">
                                <button name="username" onClick={(evt) => handleSortClick(evt)} className="flex align-middle w-full pl-1">
                                    User
                                    {sortVal.key === "username" ? dirArrow : null}
                                </button>
                            </th>

                            <th className="border-l">
                                <button name="role" onClick={(evt) => handleSortClick(evt)} className="flex align-middle w-full pl-1">
                                    Role
                                    {sortVal.key === "role" ? dirArrow : null}
                                </button>
                            </th>

                            <th className="border-l">
                                <button className="flex align-middle w-full pl-1">
                                    Posts
                                    {sortVal.key === "posts" ? dirArrow : null}
                                </button>
                            </th>

                            <th className="border-l">
                                <span className="flex align-middle pl-1">Reports</span>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="text-center text-black">
                        {userTable}
                    </tbody>

                </table>

                <section className="text-justify flex flex-col justify-center items-center w-full md:w-3/4 h-full mt-2 p-3 rounded-md">
                    <p className="text-xs md:text-sm text-white">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum nobis, voluptas dignissimos culpa ullam commodi
                        magnam numquam. Recusandae sed quod adipisci ipsa illum odit aliquid! Eius ipsam explicabo modi esse tempora.
                    </p>

                    <button className="mt-4 text-sm w-32 self-center bg-red-600 font-bold hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-red-600 duration-300">delete Post</button>
                </section>
            </div>

        </div>
    );
};

export default UserManagement;