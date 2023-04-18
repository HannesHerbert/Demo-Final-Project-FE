
import { useState } from "react";
import { IoMdSearch } from 'react-icons/io';
import { BsArrowDown } from 'react-icons/bs';




function UserManagement() {

    const [user, setUser] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("User: ", user);
    };

    return (

        <div className="container flex flex-col justify-center items-center min-h-full">
            <h2 className="text-2xl mb-2 mt-10 font-bold text-orange-700">Userlist</h2>
            <form method="get" onSubmit={handleSubmit} className="max-w-xs mx-auto w-full flex flex-col md:flex-row justify-center items-center  bg-black rounded">

                <input
                    type="search"
                    name="search"
                    value={user}
                    onChange={(event) => setUser(event.target.value)}
                    className="focus:caret-orange-500 shadow  border rounded w-full py-2 px-3 text-orange-700 leading-tight m-3"
                    placeholder='Search for User'
                />

                <button className="w-32 flex justify-center items-center bg-orange-900 font-bold hover:bg-orange-700 text-orange-100  py-2 px-4 rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-orange-600  hover:-translate-y-1 duration-300">
                    <IoMdSearch className="text-2xl" />
                </button>

            </form>

            <table className="table-auto mt-4 max-w-xs mx-auto w-full bg-black rounded">
                <thead>
                    <tr>
                        <th>User</th>
                        <th><BsArrowDown /></th>
                        <th>Role</th>
                        <th><BsArrowDown /></th>
                        <th>Blogs</th>
                        <th><BsArrowDown /></th>
                        <th>Reports</th>
                    </tr>
                </thead>

                <tbody className="text-center">
                    <tr>
                        <td>Umid</td>
                        <td>|</td>
                        <td>User</td>
                        <td>|</td>
                        <td>13 Posts</td>
                        <td>|</td>
                        <td>1</td>
                    </tr>
                </tbody>

            </table>

            <section className="text-justify flex flex-col w-full h-full mt-2 p-3 bg-black rounded">
                <p className="text-xs">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum nobis, voluptas dignissimos culpa ullam commodi
                    magnam numquam. Recusandae sed quod adipisci ipsa illum odit aliquid! Eius ipsam explicabo modi esse tempora.
                </p>

                <button className="text-sm w-32 self-center bg-red-600 font-bold hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-red-600  hover:-translate-y-1 duration-300">delete Post</button>
            </section>
        </div>
    );
};

export default UserManagement;