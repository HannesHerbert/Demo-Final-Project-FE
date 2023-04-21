import { useState, useEffect, useRef } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import useNotificationStore from "../../store/useNotificationStore";
import axios from "axios";
import defaultImage from "../../assets/anonym.png";


function UserForm({ setIsEdit }) {

    // Auth
    const user = useAuthStore(state => state.user);
    const updateUser = useAuthStore((state) => state.updateUser);
    const token = useAuthStore(state => state.getToken());

    const [username, setUsername] = useState(user.username);
    const [fullname, setFullname] = useState(user.fullname);
    const [email, setEmail] = useState(user.email);
    const [city, setCity] = useState(user.city);
    const [bday, setBday] = useState(user.birthday);
    

    // für Description-Sub-Object
    const [prefStance, setPrefStance] = useState(user.description.prefStance);
    const [favLocations, setFavLocations] = useState(user.description.favLocations);
    const [style, setStyle] = useState(user.description.style);
    const [equipment, setEquipment] = useState(user.description.equipment);
    const [text, setText] = useState(user.description.text);
    const [profileImage, setProfileImage] = useState(user.image);

    // State für Fehlermeldung
    const [errormessage, setErrormessage] = useState({
        username: '',
        password: '',
        passwordRepeat: ''
    });

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


    // Form Submit
    async function submitHandler(evt) {
        evt.preventDefault();

        console.log(typeof profileImage);

        // Wenn ist kürzer als 3 Zeichen, dann Fehlermeldung und early return
        if (username.trim().length < 3) {
            setErrormessage(prev => {
                return {
                    username: 'Username should be longer than 3 letters'
                }
            });
            return;
        }


        // Erstelle User-Objekt fuer den Body des Requests
        let updatedUser = {
            username: username,
            fullname: fullname,
            email: email,
            city: city,
            birthday: bday,
            description: {
                prefStance: prefStance,
                favLocations: favLocations,
                style: style,
                equipment: equipment,
                text: text,
            },
            image: profileImage
        };


        // Sende Request an /register endpoint der API
        try {
            const response = await axios.put(`http://localhost:8080/protected/user/${user._id}`, updatedUser, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log(response);

            // display eine 'SUCCESS' Meldung und navigiere zu Login
            alertSuccessHandler(`Your profile was successfully updated!`);

            updateUser(response.data.user)

            setIsEdit(false);

        } catch (error) {
            console.log(error);
            // Display eine Fehlermeldung
            // alertFailHandler(error.response.message);
        }
    };


    function setImage(evt) {

        const inputId = evt.target.id

        console.log(inputId);

        const file = evt.target.files[0];

        const fileReader = new FileReader();

        fileReader.readAsDataURL(file)

        fileReader.onloadend = (evt) => {

            const fileData = fileReader.result;

            //Je nach Input (evt.target) wird Front- oder Backimage gesetet
            setProfileImage(fileData);
        }
    };


    // Wenn user ist nicht eingelogt, dann wird eine Form erzeugt, ansonsten wird der user zu Loginpage navigiert
    return (

        <div id="register" className=" container font-mono flex flex-col justify-center ">

            <h2 className="text-2xl mb-2 font-bold text-center text-orange-700">EDIT YOUR PROFILE</h2>

            <form id='register-form' className="max-w-xs mx-auto flex flex-col justify-start shadow-lg shadow-indigo-500/50 rounded-md bg-gray-900 w-full p-4" onSubmit={submitHandler}>

                {/* PROFILEIMAGE */}
                <input type="file"
                    accept="image/*"
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="image-file"
                    onChange={(evt) => setImage(evt)} />

                {/* USERNAME */}
                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(evt) => setUsername(evt.target.value)}
                />
                {/* Wenn username kürzer als 3 Zeichen dann Fehlermeldung */}
                {errormessage.username && <p className="text-red-600">{errormessage.username}</p>}

                {/* FULLNAME */}
                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500 mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Fullname"
                    value={fullname}
                    onChange={(evt) => setFullname(evt.target.value)}
                />

                {/* EMAIL */}
                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                />

                {/* CITY */}
                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="City (optional)"
                    value={city}
                    onChange={(evt) => setCity(evt.target.value)}
                />

                {/* BIRTHDAY */}
                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="date"
                    value={bday}
                    onChange={(evt) => setBday(evt.target.value)}
                />

                {/* PREFERRED POSITION */}
                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="preferred stance"
                    value={prefStance}
                    onChange={(evt) => setPrefStance(evt.target.value)}
                />

                {/* FAVORITE LOCATIONS */}
                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="favorite locations"
                    value={favLocations}
                    onChange={(evt) => setFavLocations(evt.target.value)}
                />

                {/* RIDING STYLE */}
                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="riding style (f.e.: park/freestyle)"
                    value={style}
                    onChange={(evt) => setStyle(evt.target.value)}
                />

                {/* EQUIPMENT */}
                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="your equipment"
                    value={equipment}
                    onChange={(evt) => setEquipment(evt.target.value)}
                />

                {/* TEXT */}
                <input
                    className="bg-slate-900 text-orange-700 focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="your description"
                    value={text}
                    onChange={(evt) => setText(evt.target.value)}
                />


                {/* Submit Button */}
                <button
                    type='submit'
                    className="self-center w-40 bg-orange-900 font-bold hover:bg-orange-700 text-orange-100  py-2 px-4 rounded focus:outline-none focus:shadow-outline ease-in-out delay-150 bg-gradient-to-r from-orange-600  hover:-translate-y-1 hover:scale-110 duration-300 mb-6"
                >Apply
                </button>

            </form>
        </div>

    );
};


export default UserForm;