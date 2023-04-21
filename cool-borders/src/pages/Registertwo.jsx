import { useState } from "react";


function Registertwo(props) {

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

        <div id="register" className=" container flex flex-col justify-center items-center">

            <h2 className="text-3xl md:text-4xl mb-2 mt-4 text-center text-gray-200">Register now!</h2>

            <form id='register-form' className="w-full md:w-1/3 mt-11 flex flex-col justify-start p-4" onSubmit={submitHandler}>

                <input
                    className="bg-zinc-700  rounded w-full py-2 px-3 text-gray-200 leading-tight mt-3"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={evt => setUsername(evt.target.value)}
                />

                <input
                    className="bg-zinc-700  rounded w-full py-2 px-3 text-gray-200 leading-tight mt-3"
                    type="text"
                    placeholder="Fullname"
                    value={fullname}
                    onChange={evt => setFullname(evt.target.value)}
                />

                <input
                    className="bg-zinc-700  rounded w-full py-2 px-3 text-gray-200 leading-tight mt-3"
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={evt => setEmail(evt.target.value)}
                />

                <input
                    className="bg-zinc-700  rounded w-full py-2 px-3 text-gray-200 leading-tight mt-3"
                    type="text"
                    placeholder="City (optional)"
                    value={city}
                    onChange={evt => setCity(evt.target.value)}
                />

                <input
                    className="bg-zinc-700  rounded w-full py-2 px-3 text-gray-200 leading-tight mt-3"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={evt => setPassword(evt.target.value)}
                />

                <input
                    className="bg-zinc-700  rounded w-full py-2 px-3 text-gray-200 leading-tight mt-3"
                    type="password"
                    placeholder="Password again"
                    value={password}
                    onChange={evt => setPassword(evt.target.value)}
                />
 
                <button
                    type='submit'
                    className="w-full bg-indigo-500 font-bold  text-white py-2 px-4 rounded-full mt-7 focus:outline-none focus:shadow-outline ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
                >Register
                </button>

            </form>
        </div>

    );
};


export default Registertwo;