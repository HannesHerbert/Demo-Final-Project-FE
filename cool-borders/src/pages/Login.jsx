import { useState } from "react";

import {Link} from 'react-router-dom';
import Register from "./Register";


import {FaRegUserCircle} from 'react-icons/fa';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Email: ", email);
      console.log("Password: ", password);
    };

    return (
        <div className="container flex flex-col font-mono  shadow-lg shadow-indigo-500/20 p-4" id="login">
           
            <div className="flex flex-col items-center ">
                
                <h2 className="text-4xl mb-10 font-bold text-orange-300">LOGIN</h2>
            </div>
           
            <form onSubmit={handleSubmit} className="max-w-xs mx-auto w-full">
                <div className="mb-4">
                   
                    <input
                    
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Password"
                    required
                    />
                </div>
                    <a
                    href="/forgot-password"
                    className="inline-block align-baseline text-xs text-gray-400  hover:text-orange-300  mb-4"
                    >
                    Forgot Password?
                    </a>

                

                <div className="flex flex-col items-center">
              
                    <button className=" w-40 bg-orange-500 font-bold hover:bg-orange-700 text-orange-100  py-2 px-4 rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-orange-500 hover:-translate-y-1 hover:scale-110 duration-300 " >Sign in</button>
                    <p className="text-xs text-gray-400 mt-6">Not registred?<Link to='/auth/register'><span className="text-orange-500 hover:text-orange-300"> Create an account </span></Link></p> 
                </div>
                

            </form>
        </div>
    )
}

export default Login;