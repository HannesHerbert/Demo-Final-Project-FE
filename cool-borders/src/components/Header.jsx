import { Link, useLocation } from "react-router-dom";
/* import Logo1 from '../assets/LOgoW.png'; */
import Logo from '../assets/LOgoW.png';

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
    } else if ((location.pathname === '/auth/login') || (location.pathname ==='/auth/register') || (location.pathname ==='/create')) {
        text = 'REGISTRATION'
    } else if ((location.pathname === '/user') || (location.pathname === '/usermanagement')){
        text = 'MANAGEMENT'
    };


    return (

        <header className='fixed top-0 left-0 flex justify-between items-center w-full h-24 bg-white z-40'  >
            <Link to='/'>
                <img src={Logo} alt="logo" width={'90px'} className="" />
                {/*  <img src={Logo} alt="logo" width={'150px'}/> */}
            </Link>

            <div>
                {<h2 className="text-gray-600 text-title text-lg md:text-4xl">{text}</h2>}
            </div>



            <div className="flex">
                <Link to='/user'> <FaUserAlt className="mr-4 text-lg text-gray-600 " /> </Link>

                <Link to='/auth/login' > <RiLoginBoxLine className="mr-5 text-lg text-gray-600" /></Link>

            </div>


            {/*   <div><i className="fa-solid fa-user-plus p-2"></i></div> */}

        </header>




    )
}

export default Header;