import { useState, useEffect, useRef } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import useNotificationStore from "../store/useNotificationStore";
import axios from "axios";


function Register(props) {

    // const [username, setUsername] = useState('');
    const usernameRef = useRef();
    const fullnameRef = useRef();
    
    const emailRef = useRef();
    const cityRef = useRef();
    const passwordRef = useRef();
    const passwordRepeatRef = useRef();


    const isAuthenticated = useAuthStore(state => state.isAuthenticated());
    const navigate = useNavigate();
    const location = useLocation();

    const notificationHandler = useNotificationStore(state => state.notificationHandler);




    function alertSuccessHandler(msg) {
        notificationHandler('success', msg)
    }
    function alertFailHandler(msg) {
        notificationHandler('fail', msg)
    }

    async function submitHandler(evt) {
        evt.preventDefault();

        console.log(usernameRef);

        if (usernameRef.current.value.trim().length < 3) {

            return  //Todo erstelle ein Fehlermeldung für User
        }
        if (passwordRef.current.value.trim().length < 5) {

            return //Todo erstelle ein Fehlermeldung für User
        }
        if (passwordRepeatRef.current.value !== passwordRef.current.value) {
            return // Todo erstelle ne Meldung für user, dass passwörter nicht stimmen
        }

        // Erstelle Objekt fuer den Body des Requests
        let registrationData = {
            username: usernameRef.current.value,
            fullname: fullnameRef.current.value,
            email: emailRef.current.value,
            city: cityRef.current.value,
            password: passwordRef.current.value,
            // authentication: passwordRef.current.value
        };

        // Sende Request an /register endpoint der API
        try {
            const response = await axios.post('http://localhost:8080/public/register', registrationData);
            console.log(response);
            alertSuccessHandler('Thank you for registration!');

            navigate('/auth/login');

        } catch (error) {
            console.log(error);
            alertFailHandler(error.response.data.message);
        }
        // axios.post('http://localhost:8080/auth/register', registrationData)
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });
    };

    return ( !isAuthenticated ?

        <div id="register" className=" container font-mono flex flex-col justify-center ">

            <h2 className="text-2xl mb-2 font-bold text-center text-orange-700">REGISTER NOW!</h2>

            <form id='register-form' className="max-w-xs mx-auto flex flex-col justify-start shadow-lg shadow-indigo-500/50 rounded-md bg-gray-900 w-full p-4" onSubmit={submitHandler}>

                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Username"
                    ref={usernameRef}
                    // onChange={evt => setUsername(evt.target.value)}
                />

                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500 mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Fullname"
                    ref={fullnameRef}
                    // onChange={evt => setFullname(evt.target.value)}
                />

                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="E-mail"
                    ref={emailRef}
                    // onChange={evt => setEmail(evt.target.value)}
                />

                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="City (optional)"
                    ref={cityRef}
                    // onChange={evt => setCity(evt.target.value)}
                />

                <input
                    className="bg-slate-900 text-orange-700  focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                    // onChange={evt => setPassword(evt.target.value)}
                />

                <input
                    className="bg-slate-900 text-orange-700  focus:caret-orange-500  mb-6 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="Password again"
                    ref={passwordRepeatRef}
                    // onChange={evt => setPassword(evt.target.value)}
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
        :
        <Navigate to={'/news'} replace state={{from: location}} />

    );
};


export default Register;