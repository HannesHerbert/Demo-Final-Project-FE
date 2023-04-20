import { Link, useLocation } from "react-router-dom";
/* import Logo1 from '../assets/LOgoW.png'; */
import Logo from '../assets/lo11.png';

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
    }


    return (

        <header className='fixed top-4 left-0 flex justify-between items-center w-full h-24'  >
            <Link to='/'>
               <img src={Logo} alt="logo" width={'90px'} />
               {/* <h1 className="absolute bottom-16 left-20 text-s ">BOARDERGRAM</h1> */}
                {/*  <img src={Logo} alt="logo" width={'150px'}/> */}
 
            {<h2 className="text-orange-500 text-2xl font-bold text-title  ">{text}</h2>}
            </Link>

            <div>
                
            </div>



            <div className="flex">
                <Link to='/user'> <FaUserAlt size="20px" className="mr-5 hover:text-orange-500 text-orange-700 " /> </Link>

                <Link to='/auth/login' > <RiLoginBoxLine size="22px" className="mr-5 hover:text-orange-700 text-gray-400" /></Link>

            </div>


            {/*   <div><i className="fa-solid fa-user-plus p-2"></i></div> */}

        </header>




    )
}

export default Header;