import { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import Register from "./Register";
import { FaRegUserCircle } from 'react-icons/fa';
import useAuthStore from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";



function Login() {
    const usernameRef = useRef();
    const passwordRef = useRef();

    const authenticate = useAuthStore((state) => state.authenticate);
    const isAuthenticated = useAuthStore(state => state.isAuthenticated());

    const token = useAuthStore(state => state.getToken());
    const validateToken = useAuthStore(state => state.validateToken);

    const navigate = useNavigate();

    useEffect(() => {
        if (token && !isAuthenticated) {
            validateToken()
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
        navigate('/news')
        }
    }, [isAuthenticated]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Erstelle Objekt fuer den Body des Requests
        const loginData = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };

        try {
            
            const response = await axios.post('http://localhost:8080/public/login', loginData);

            console.log(response);

            authenticate(response.data.user, response.data.token);

        } catch (error) {
            console.log(error);
        }

        console.log("Username: ", loginData.username);
        console.log("Password: ", loginData.password);
    };

    return (
        <div className="container flex flex-col bg-black h-screen" id="login">

            <div className="flex flex-col items-center ">

                <h2 className="text-4xl mb-2 mt-10 text-title font-bold text-gray-100">Login</h2>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto w-full h-full md:w-1/3 p-6  rounded-md">
                <div className="mb-4">


                    <input

                        type="text"
                        name="username"
                        ref={usernameRef}
                        className="bg-slate-900  focus:caret-orange-500 shadow  border rounded w-full py-2 px-3 text-orange-700 leading-tight mt-3"
                        placeholder="Username"

                        required
                    />
                </div>
                <div className="mb-4">


                    <input
                        type="password"
                        name="password"
                        ref={passwordRef}
                        className="bg-slate-900  focus:caret-orange-500 shadow  border rounded w-full py-2 px-3 text-orange-700 leading-tight"
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