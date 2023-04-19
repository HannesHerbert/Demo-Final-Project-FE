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

           {/*  <h2 className="text-2xl md:text-4xl mb-2 mt-4 text-center text-black">Register now!</h2> */}

            <form id='register-form' className="w-full md:w-1/3 mt-10 flex flex-col justify-start p-4" onSubmit={submitHandler}>

                <input
                    className="mb-5 appearance-none border-b-2 border-inherit max-w-full py-2 px-3 text-black leading-relaxed focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={evt => setUsername(evt.target.value)}
                />

                <input
                    className="mb-5 appearance-none border-b-2 border-inherit max-w-full py-2 px-3 text-black leading-relaxed focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Fullname"
                    value={fullname}
                    onChange={evt => setFullname(evt.target.value)}
                />

                <input
                    className="mb-5 appearance-none border-b-2 border-inherit max-w-full py-2 px-3 text-black leading-relaxed focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={evt => setEmail(evt.target.value)}
                />

                <input
                    className="mb-5 appearance-none border-b-2 border-inherit max-w-full py-2 px-3 text-black leading-relaxed focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="City (optional)"
                    value={city}
                    onChange={evt => setCity(evt.target.value)}
                />

                <input
                    className="mb-5 appearance-none border-b-2 border-inherit max-w-full py-2 px-3 text-black leading-relaxed focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={evt => setPassword(evt.target.value)}
                />

                <input
                    className="mb-5 appearance-none border-b-2 border-inherit max-w-full py-2 px-3 text-black leading-relaxed focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="Password again"
                    value={password}
                    onChange={evt => setPassword(evt.target.value)}
                />
 
                <button
                    type='submit'
                    className="self-center w-40  bg-green-600 hover:bg-white hover:border-green-600 text-white hover:text-green-600 py-2 px-4 rounded-full mb-6"
                >Register
                </button>

            </form>
        </div>

    );
};


export default Registertwo;