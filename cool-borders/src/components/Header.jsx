import { Link, useLocation } from "react-router-dom";
/* import Logo from '../assets/border.png'; */
import Logo from '../assets/boardergram-logo.png';


import { RiLoginBoxLine } from 'react-icons/ri'
import { FaUserAlt } from 'react-icons/fa'


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
    } else if (location.pathname === '/auth/register') {
        text = 'REGISTRATION'
    } else if ((location.pathname === '/user') || (location.pathname === '/usermanagement')) {
        text = 'MANAGEMENT'
    } else if (location.pathname === '/auth/login') {
        text = 'LOGIN'
    } else if (location.pathname === '/create') {
        text = 'NEW POST'
    }


    return (

        <header className='fixed top-0 left-0 flex justify-between items-center w-full h-24 bg-white z-40'  >

            <Link to='/'>
                <img src={Logo} alt="logo" className="md:mt-16 w-20 md:w-44 opacity-80 rounded-full" />
            </Link>

            <div className="md:-ml-5">
                {<h2 className="text-gray-600 headline text-lg tracking-wide md:text-4xl">{text}</h2>}
                <div className="bg-green-600 h-3 md:h-5 opacity-30 rounded-full -mt-5 md:-mt-7"></div>
            </div>


            <div className="flex">
                <Link to='/user'> <FaUserAlt className="mr-4 text-lg md:text-2xl text-gray-500 hover:text-gray-600" /> </Link>

                <Link to='/auth/login' > <RiLoginBoxLine className="mr-5 text-lg md:text-2xl text-gray-500 hover:text-gray-600" /></Link>
            </div>

        </header>

    )
}

export default Header;