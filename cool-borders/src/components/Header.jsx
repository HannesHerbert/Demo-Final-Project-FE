import { Link, useLocation } from "react-router-dom";
/* import Logo from '../assets/boardergram-logo.png'; */

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

            <Link to='/' className="flex flex-row justify-center items-center -ml-2 md:-mt-4">
                {/* <img src={Logo} alt="logo" className="md:mt-16 w-20 md:w-44 opacity-80 rounded-full" /> */}
                <img src={Logo} alt="logo" className="-mt-2 md:mt-16 w-32 md:w-60 opacity-80 rounded-full" />
                <span className="absolute headline text-lg text-gray-900 ml-20 mt-3 md:ml-24 md:mt-28">GRAM</span>
            </Link>

            <div className="-ml-4 md:-ml-7">
                {<h2 className="text-gray-600 headline text-lg tracking-wide md:text-4xl">{text}</h2>}
                <div className="bg-green-600 h-3 md:h-5 opacity-30 rounded-full -mt-5 md:-mt-7"></div>
            </div>
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