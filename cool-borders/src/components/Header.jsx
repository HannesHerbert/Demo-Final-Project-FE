import { Link, useLocation } from "react-router-dom";

/* import Logo from '../assets/border.png'; */
import Logo from '../assets/LOgoW.png';


import { RiLoginBoxLine } from 'react-icons/ri'
import { FaUserAlt } from 'react-icons/fa'


function Header() {

    const location = useLocation();
    let text;
    if (location.pathname === '/') {
        text = 'news'
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


        <header className='fixed top-0 left-0 flex justify-between items-center w-full h-24 bg-black z-40'  >

            <Link to='/'>
                <img src={Logo} alt="logo" className="md:mt-16 w-20 md:w-44 opacity-80 rounded-full" />
            </Link>

           {/*  <div className="md:-ml-5">
                
                <div className="bg-green-600 rounded-full ">{<h2 className="text-white headline text-lg text-center pr-4 pl-4">{text}</h2>}</div>

            </div> */}


            <div className="flex">
                <Link to='/user'> <FaUserAlt className="mr-4 text-lg md:text-2xl text-white hover:text-indigo-600" /> </Link>

                <Link to='/auth/login' > <RiLoginBoxLine className="mr-5 text-lg md:text-2xl text-white hover:text-indigo-500" /></Link>
            </div>

        </header>

    )
}

export default Header;