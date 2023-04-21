
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
            {/* <h2 className="text-2xl md:text-4xl mb-2 mt-10 font-bold text-title text-orange-500">Userlist</h2> */}

            <form method="get" onSubmit={handleSubmit} className="w-xs mx-auto w-full md:w-1/2 flex flex-col md:flex-row justify-center items-center">

                <input
                    type="search"
                    name="search"
                    value={user}
                    onChange={(event) => setUser(event.target.value)}
                    className="focus:caret-orange-500 shadow  border rounded w-full py-2 px-3 text-orange-500 leading-tight m-3"
                    placeholder='Search for User'
                />

                <button className="w-32 flex justify-center items-center bg-orange-500 font-bold hover:bg-orange-600 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-orange-600 duration-300">
                    <IoMdSearch className="text-2xl" />
                </button>

            </form>

            <div className="flex flex-col justify-center items-center w-full md:w-3/4 bg-gray-900 rounded mt-4 p-4">
                <table className="table-fixed w-full md:w-3/4 md:text-lg">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th><BsArrowDown /></th> {/* Sortierfkt.: hab die Icons in eine neue Spalte gesetzt */}
                            <th>Role</th>
                            <th><BsArrowDown /></th>
                            <th>Posts</th>
                            <th><BsArrowDown /></th>
                            <th>Reports</th>
                        </tr>
                    </thead>

                    <tbody className="text-center">
                        <tr>
                            <td>Umid</td>
                            <td></td> {/* TODO: kann auch frei gelassen werden */}
                            <td>User</td>
                            <td></td>
                            <td>13</td>
                            <td></td>
                            <td>1</td>
                        </tr>
                    </tbody>

                </table>

                <section className="text-justify flex flex-col justify-center items-center w-full md:w-3/4 h-full mt-2 p-3 rounded-md">
                    <p className="text-xs md:text-sm">
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