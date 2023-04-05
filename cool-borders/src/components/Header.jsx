import { Link } from "react-router-dom";
/* import Logo1 from '../assets/LOgoW.png'; */
import Logo from '../assets/logo2.png';

import{RiLoginBoxLine} from 'react-icons/ri'

import{FaUserAlt} from 'react-icons/fa'

function Header() {
    


    return(
        
            <header className='fixed top-0 left-0 flex justify-between items-center w-full h-24 '  >
                <Link to= '/'>
                    <img src={Logo} alt="logo" width={'90px'}  />
                   {/*  <img src={Logo} alt="logo" width={'150px'}/> */}
                </Link>
                <div className="flex">
                    <Link to='/user'> <FaUserAlt size="20px" className="mr-5 hover:text-orange-300"/> </Link>
                    
                    <Link to='/auth/login' > <RiLoginBoxLine size="22px" className="mr-5 hover:text-orange-300"/></Link>

                </div>
                
            
            {/*   <div><i className="fa-solid fa-user-plus p-2"></i></div> */}
    
            
                
            </header>
       
  
        

    )
}

export default Header;