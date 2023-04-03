

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
    }

    return (

        <div id="register" className="flex flex-col justify-center items-center ">
            <h3>Register now!</h3>
            <form id='register-form' className="flex flex-col justify-start items-center" onSubmit={submitHandler}>
                <label>Username
                    <input type="text" value={username} onChange={evt => setUsername(evt.target.value)} />
                </label>
                <label>Fullname
                    <input type="text" value={fullname} onChange={evt => setFullname(evt.target.value)} />
                </label>
                <label>E-mail
                    <input type="text" value={email} onChange={evt => setEmail(evt.target.value)} />
                </label>
                <label>City (optional)
                    <input type="text" value={city} onChange={evt => setCity(evt.target.value)} />
                </label>
                <label>Password
                    <input type="password" value={password} onChange={evt => setPassword(evt.target.value)} />
                </label>
                <label>Password again
                    <input type="password" value={password} onChange={evt => setPassword(evt.target.value)} />
                </label>
                <button type='submit' className="self-end">Register</button>
            </form>
        </div>

    );
}

export default Register;