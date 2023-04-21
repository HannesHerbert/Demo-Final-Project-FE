import { useState } from "react";

import { Link } from 'react-router-dom';



import { FaRegUserCircle } from 'react-icons/fa';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Email: ", email);
        console.log("Password: ", password);
    };

    return (
        <div className="container flex flex-col bg-black h-screen" id="login">

            <div className="flex flex-col items-center ">

                <h2 className="text-4xl mb-2 mt-10 text-title font-bold text-gray-100">Login</h2>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto w-full h-full md:w-1/3 p-6  rounded-md">
                <div className="mb-4">

                    <input

                        type="email"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="bg-zinc-700  rounded w-full py-2 px-3 text-gray-200 leading-tight mt-3 hover:outline-green-400"
                        placeholder="Email"

                        required
                    />
                </div>
                <div className="mb-4">

                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="bg-zinc-700  rounded w-full py-2 px-3 text-gray-200 leading-tight "
                        placeholder="Password"
                        required
                    />
                </div>
                <a
                    href="/forgot-password"
                    className="inline-block align-baseline text-xs text-gray-400  hover:text-red-300  mb-4"
                >
                    Forgot Password?
                </a>



                <div className="flex flex-col items-center">

                    <button className=" bg-indigo-500 w-full rounded-full text-gray-200 p-1  hover:bg-white hover:text-indigo-600" >Sign in</button>
                    <p className="text-xs text-gray-400 mt-6">Not registred?<Link to='/auth/register'> <span className="text-white hover:text-green-300 underline md:underline-offset-8"> Create an account </span></Link></p>
                </div>


            </form>
        </div>
    )
}

export default Login;