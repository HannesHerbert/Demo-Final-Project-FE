import { useState } from "react";

import {Link} from 'react-router-dom';
import Register from "./Register";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Email: ", email);
      console.log("Password: ", password);
    };

    return (
        <div className="container  font-mono" id="login">

            <div className="flex justify-around my-20">
                <button className="bg-orange-500  hover:bg-orange-700 text-orange-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
                <Link to='/auth/register'> <button className="bg-orange-500  hover:bg-orange-700 text-orange-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button> </Link>

            </div>

           
            <form onSubmit={handleSubmit} className="max-w-xs mx-auto">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-orange-500 font-bold mb-2">
                    Email/User
                    </label>
                    <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    />
                </div>
                <div className="mb-6">
                    <label
                    htmlFor="password"
                    className="block text-orange-500  font-bold mb-2"
                    >
                    Password
                    </label>
                    <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    />
                </div>
                
                <div className="flex items-center justify-between">
                    <button
                    type="submit"
                    className="bg-orange-500  hover:bg-orange-700 text-orange-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                    Sign In
                    </button>
                    <a
                    href="/forgot-password"
                    className="inline-block align-baseline font-bold text-sm text-orange-500  hover:text-orange-300 "
                    >
                    Forgot Password?
                    </a>
                </div>
            </form>
        </div>
    )
}

export default Login;