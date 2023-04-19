import { useState } from "react";


function Register(props) {

    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');

    function submitHandler(evt) {
        evt.preventDefault();

        // Erstelle Objekt fuer den Body des Requests
        let registrationData = {
            username: username,
            fullname: fullname,
            email: email,
            city: city,
            password: password,
            authentication: password
        };

        // Sende Request an /register endpoint der API
        axios.post('http://localhost:8080/auth/register', registrationData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (

        <div id="register" className=" container font-sans flex flex-col justify-center ">

            <h2 className="text-4xl mb-2 mt-4 text-title font-bold text-center text-orange-500">Register now!</h2>

            <form id='register-form' className="w-full md:w-1/3 mx-auto flex flex-col justify-start shadow-lg shadow-indigo-500/50 rounded-md bg-gray-900 p-4" onSubmit={submitHandler}>

                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={evt => setUsername(evt.target.value)}
                />

                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500 mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Fullname"
                    value={fullname}
                    onChange={evt => setFullname(evt.target.value)}
                />

                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={evt => setEmail(evt.target.value)}
                />

                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="City (optional)"
                    value={city}
                    onChange={evt => setCity(evt.target.value)}
                />

                <input
                    className="bg-slate-900 text-orange-700  focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={evt => setPassword(evt.target.value)}
                />

                <input
                    className="bg-slate-900 text-orange-700  focus:caret-orange-500  mb-6 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="Password again"
                    value={password}
                    onChange={evt => setPassword(evt.target.value)}
                />

                <button
                    type='submit'
                    className="self-center w-40 bg-orange-500 font-bold hover:bg-orange-600 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-orange-500  hover:-translate-y-1 hover:scale-110 duration-300 mb-6"
                >Register
                </button>

            </form>
        </div>

    );
};


export default Register;