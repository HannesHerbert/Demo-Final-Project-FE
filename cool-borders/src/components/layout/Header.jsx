import { Link, useLocation } from "react-router-dom";
/* import Logo from '../assets/boardergram-logo.png'; */

/* import Logo from '../assets/border.png'; */
import Logo from '../../assets/LOgoW.png';


import { RiLoginBoxLine } from 'react-icons/ri'

import { FaUserAlt } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { LoginLogoutButton } from "../buttons/LoginLogoutButton.jsx";


function Header() {


    return (

        <header className='fixed top-0 left-0 flex justify-between items-center w-full h-24 bg-black z-40'  >

            <Link to='/' className="flex flex-row justify-center items-center -ml-2 md:-mt-4">
                {/* <img src={Logo} alt="logo" className="md:mt-16 w-20 md:w-44 opacity-80 rounded-full" /> */}
                <img src={Logo} alt="logo" className="-mt-2 md:mt-16 w-32 md:w-60 opacity-80 rounded-full" />
            </Link>

            <div className="flex">

                <Link to='/admin'> <MdAdminPanelSettings size="20px" className="mr-5 hover:text-orange-500 text-orange-700 " /> </Link>

                {/* <button><FaUserAlt size="20px" className="mr-5 hover:text-orange-500 text-orange-700 " /></button> */}
                <Link to='/user'> <FaUserAlt size="20px" className="mr-5 hover:text-orange-500 text-orange-700 " /> </Link>

                <LoginLogoutButton />

            </div>

        </header>

    )
}

export default Header;