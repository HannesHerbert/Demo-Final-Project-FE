import { useState, useEffect, useRef } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import useNotificationStore from "../store/useNotificationStore";
import axios from "axios";


function Register() {
    // refs zu Formdaten
    const usernameRef = useRef();
    const fullnameRef = useRef();
    const emailRef = useRef();
    const cityRef = useRef();
    const passwordRef = useRef();
    const passwordRepeatRef = useRef();
    // State für Fehlermeldung
    const [errormessage, setErrormessage] = useState({
        username: '',
        password: '',
        passwordRepeat: ''
    });
    // Auth
    const isAuthenticated = useAuthStore(state => state.isAuthenticated());
    // Nav
    const navigate = useNavigate();
    const location = useLocation();
    // Notification Handler function
    const notificationHandler = useNotificationStore(state => state.notificationHandler);




    // Wenn die Daten zum Server korrekt gesendet sind, wird ein Alert mit Success erzeugt
    function alertSuccessHandler(msg) {
        notificationHandler('success', msg)
    }
    // Wenn bei register ein Fehler, wird ein Alert mit Fehlermeldung erzeugt
    function alertFailHandler(msg) {
        notificationHandler('fail', msg)
    }


    // Form Submitt
    async function submitHandler(evt) {
        evt.preventDefault();

        // Wenn ist kürzer als 3 Zeichen, dann Fehlermeldung und early return
        if (usernameRef.current.value.trim().length < 3) {
            setErrormessage(prev => {
                return {
                    username: 'Username should be longer than 3 letters'
                }
            });
            return;
        }
        // Wenn password ist kurzer als 5 Zeichen, dann Fehlermeldung und early return
        if (passwordRef.current.value.trim().length < 5) {
            setErrormessage(prev => {
                return {
                    password: 'Password should be longer than 5 symbols'
                }
            });
            return;
        }   
        // Wenn password und wiederhol-password nicht gleich sind, dann Fehlermeldung und early return
        if (passwordRepeatRef.current.value !== passwordRef.current.value) {
            console.log(`Die passwörter stimmen nicht!`);
            setErrormessage(prev => {
                return {
                    passwordRepeat: `Die passwörter stimmen nicht!`
                }
            });
            return;
        }

        // Erstelle User-Objekt fuer den Body des Requests
        let registrationData = {
            username: usernameRef.current.value,
            fullname: fullnameRef.current.value,
            email: emailRef.current.value,
            city: cityRef.current.value,
            password: passwordRef.current.value,
        };

        // Sende Request an /register endpoint der API
        try {
            const response = await axios.post('http://localhost:8080/public/register', registrationData);
            console.log(response);
            // display eine 'SUCCESS' Meldung und navigiere zu Login
            alertSuccessHandler(`Thank you for registration, ${registrationData.username}!`);
            navigate('/auth/login');

        } catch (error) {
            console.log(error);
            // Display eine Fehlermeldung
            alertFailHandler(error.response.data.message);
        }
    };
            // Wenn user ist nicht eingelogt, dann wird eine Form erzeugt, ansonsten wird der user zu Loginpage navigiert
    return ( !isAuthenticated ?

        <div id="register" className=" container font-mono flex flex-col justify-center ">

            <h2 className="text-2xl mb-2 font-bold text-center text-orange-700">REGISTER NOW!</h2>

            <form id='register-form' className="max-w-xs mx-auto flex flex-col justify-start shadow-lg shadow-indigo-500/50 rounded-md bg-gray-900 w-full p-4" onSubmit={submitHandler}>
                {/* USERNAME */}
                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Username"
                    ref={usernameRef}
                />
                {/* Wenn username kürzer als 3 Zeichen dann Fehlermeldung */}
                {errormessage.username && <p className="text-red-600">{errormessage.username}</p>}

                {/* FULLNAME */}
                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500 mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Fullname"
                    ref={fullnameRef}
                />

                {/* EMAIL */}
                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="E-mail"
                    ref={emailRef}
                />

                {/* CITY */}
                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="City (optional)"
                    ref={cityRef}
                />

                {/* PASSWORD */}
                <input
                    className="bg-slate-900 text-orange-700  focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                />
                {/* Wenn password ist kürzer als 5 Zeichen dann Fehlermeldung */}
                {errormessage.password && <p className="text-red-600">{errormessage.password}</p>}

                {/* PASSWORD WIEDERGABE*/}
                <input
                    className="bg-slate-900 text-orange-700  focus:caret-orange-500  mb-6 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="Password again"
                    ref={passwordRepeatRef}
                />
                {/* Wenn passwörter nicht stimmen, dann Fehlermeldung */}
                {errormessage.passwordRepeat && <p className="text-red-600">{errormessage.passwordRepeat}</p>}
                {/* Submit Button */}
                <button
                    type='submit'
                    className="self-center w-40 bg-orange-900 font-bold hover:bg-orange-700 text-orange-100  py-2 px-4 rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-orange-600  hover:-translate-y-1 hover:scale-110 duration-300 mb-6"
                >Register
                </button>

            </form>
        </div>
        :
        // wenn user is authenticated - navigate to news
        <Navigate to={'/news'} replace state={{from: location}} />

    );
};


export default Register;