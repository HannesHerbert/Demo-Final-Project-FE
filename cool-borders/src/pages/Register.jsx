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

        <div id="register" className=" container font-mono flex flex-col justify-center ">

            <h2 className="text-2xl mb-2 font-bold text-center text-orange-700">REGISTER NOW!</h2>

            <form id='register-form' className="max-w-xs mx-auto flex flex-col justify-start shadow-lg shadow-indigo-500/50 rounded-md bg-gray-900 w-full p-4" onSubmit={submitHandler}>

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


            {/*     <label
                    className="block text-orange-500 font-bold mb-4"
                >Username
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={evt => setUsername(evt.target.value)} />
                </label>

                <label
                    className="block text-orange-500 font-bold mb-4"
                >Fullname
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Fullname"
                        value={fullname}
                        onChange={evt => setFullname(evt.target.value)}
                    />
                </label>

                <label
                    htmlFor="email"
                    className="block text-orange-500 font-bold mb-4"
                >E-mail
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={evt => setEmail(evt.target.value)}
                    />
                </label>

                <label
                    className="block text-orange-500 font-bold mb-4"
                >City (optional)
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="City (optional)"
                        value={city}
                        onChange={evt => setCity(evt.target.value)}
                    />
                </label>

                <label
                    htmlFor="password"
                    className="block text-orange-500 font-bold mb-4"
                >Password
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={evt => setPassword(evt.target.value)}
                    />
                </label>

                <label
                    htmlFor="password"
                    className="block text-orange-500 font-bold mb-4"
                >Password again
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        placeholder="Password again"
                        value={password}
                        onChange={evt => setPassword(evt.target.value)}
                    />
                </label> */}

                <button
                    type='submit'
                    className="self-center w-40 bg-orange-900 font-bold hover:bg-orange-700 text-orange-100  py-2 px-4 rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-orange-600  hover:-translate-y-1 hover:scale-110 duration-300 mb-6"
                >Register
                </button>

            </form>
        </div>

    );
};


export default Register;