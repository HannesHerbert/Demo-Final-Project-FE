import { Link, useLocation } from "react-router-dom";
/* import Logo1 from '../assets/LOgoW.png'; */
import Logo from '../assets/logo2.png';

import { RiLoginBoxLine } from 'react-icons/ri'

import { FaUserAlt } from 'react-icons/fa';
import { LoginLogoutButton } from "./buttons/LoginLogoutButton.jsx";


function Header() {

    const location = useLocation();
    let text;
    if (location.pathname === '/') {
        text = 'NEWS'
    } else if (location.pathname === '/blogs') {
        text = 'BLOG'
    } else if (location.pathname === '/favs') {
        text = 'FAVS'
    } else if (location.pathname === '/chat') {
        text = 'CHAT'
    }


    return (

        <header className='fixed top-0 left-0 flex justify-between items-center w-full h-24 bg-gray-900'  >
            <Link to='/'>
                <img src={Logo} alt="logo" width={'90px'} />
                {/*  <img src={Logo} alt="logo" width={'150px'}/> */}
            </Link>

            <div>
                {<h2 className="text-orange-500 text-4xl font-bold text-title">{text}</h2>}
            </div>



            <div className="flex">
                {/* <button><FaUserAlt size="20px" className="mr-5 hover:text-orange-500 text-orange-700 " /></button> */}
                <Link to='/user'> <FaUserAlt size="20px" className="mr-5 hover:text-orange-500 text-orange-700 " /> </Link>

                <LoginLogoutButton />

            </div>


            {/*   <div><i className="fa-solid fa-user-plus p-2"></i></div> */}

        </header>




    )
}

export default Header;