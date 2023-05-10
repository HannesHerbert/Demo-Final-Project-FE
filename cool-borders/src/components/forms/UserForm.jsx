import { useEffect, useState } from "react";
import useNotificationStore from "../../store/useNotificationStore";
import { image } from "@cloudinary/url-gen/qualifiers/source";


function UserForm({ userToEdit, sendRequest, isAdminAct }) {

    const [username, setUsername] = useState(userToEdit.username);
    const [fullname, setFullname] = useState(userToEdit.fullname);
    const [email, setEmail] = useState(userToEdit.email);
    const [city, setCity] = useState(userToEdit.city);
    const [bday, setBday] = useState(userToEdit.birthday);
    const [profileImage, setProfileImage] = useState(userToEdit.image);
    const [role, setRole] = useState(userToEdit.role);

    // für Description-Sub-Object, wenn description-key nicht vorhanden dann ersetze durch "n/a"
    const [prefStance, setPrefStance] = useState(!userToEdit.description ? "n/a" : userToEdit.description.prefStance);
    const [favLocations, setFavLocations] = useState(!userToEdit.description ? "n/a" : userToEdit.description.favLocations);
    const [style, setStyle] = useState(!userToEdit.description ? "n/a" : userToEdit.description.style);
    const [equipment, setEquipment] = useState(!userToEdit.description ? "n/a" : userToEdit.description.equipment);
    const [text, setText] = useState(!userToEdit.description ? "n/a" : userToEdit.description.text);

    // State für Fehlermeldung
    const [errormessage, setErrormessage] = useState({
        username: '',
        password: '',
        passwordRepeat: ''
    });

    /* Array mit Objekten der Filtermöglichkeiten */
    let optionValues = [
        { label: 'User', value: 'user' },
        { label: 'Author', value: 'author' },
        { label: 'Admin', value: 'admin' }
    ];


    // Notification Handler function
    const notificationHandler = useNotificationStore(state => state.notificationHandler);
    // Wenn die Daten zum Server korrekt gesendet sind, wird ein Alert mit Success erzeugt
    function alertSuccessHandler(msg) {
        notificationHandler('success', msg)
    };
    // Wenn bei register ein Fehler, wird ein Alert mit Fehlermeldung erzeugt
    function alertFailHandler(msg) {
        notificationHandler('fail', msg)
    };


    const roleSelect = <select onChange={evt => setRole(evt.target.value)}
        className="p-1 rounded-md text-white bg-black hover:text-indigo-200 mt-6">
        {optionValues.map((role) => (
            <option key={role.value} value={role.value} className="rounded-md p-2"
                selected={role.value === userToEdit.role}>{role.label}
            </option>
        ))}
    </select>



    // Form Submit
    async function submitHandler(evt) {
        evt.preventDefault();

        console.log("Spinner on");

        // Wenn ist kürzer als 3 Zeichen, dann Fehlermeldung und early return
        if (username.trim().length < 3) {
            setErrormessage(prev => {
                return {
                    username: 'Username should be longer than 3 characters'
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
            image: profileImage,
        };

        if (isAdminAct) updatedUser.role = role;

        sendRequest(updatedUser)
    };


    function setImage(evt) {

        const file = evt.target.files[0];

        const fileReader = new FileReader();

        fileReader.readAsDataURL(file)

        fileReader.onloadend = (evt) => {

            const fileData = fileReader.result;

            setProfileImage(fileData);
        }
    };


    // Wenn user nicht eingelogt ist, dann wird ein Formular erzeugt, ansonsten wird der user zu Loginpage navigiert
    return (


        <form id='register-form' className="max-w-xs mx-auto flex flex-col justify-start shadow-lg shadow-indigo-500/50 rounded-md bg-gray-900 w-full p-4" onSubmit={submitHandler}>

            {/* PROFILEIMAGE */}
            <input type="file"
                // accept="image/*"
                className="bg-slate-900 text-orange-700 focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="image-file"
                // value={}
                onChange={(evt) => setImage(evt)}
            />

            {/* Wenn username kürzer als 3 Zeichen dann Fehlermeldung */}
            {errormessage.username && <p className="text-red-600">{errormessage.username}</p>}
            {/* USERNAME */}
            <input
                className="bg-slate-900 text-orange-700 focus:caret-orange-500  mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(evt) => setUsername(evt.target.value)}
            />

            {/* FULLNAME */}
            <input
                className="bg-slate-900 text-orange-700 focus:caret-orange-500 mb-5 shadow appearance-none border rounded max-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Fullname"
                value={fullname}
                onChange={(evt) => setFullname(evt.target.value)}
            />

            {/* ROLE */}
            {isAdminAct ? roleSelect : null}

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


    );
};


export default UserForm;