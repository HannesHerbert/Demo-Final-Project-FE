import { Link } from "react-router-dom";
/* import Logo1 from '../assets/LOgoW.png'; */
import Logo from '../assets/logo2.png';

import{FiUserPlus} from 'react-icons/fi'

function Header() {
    


    return(
        
            <header className='fixed top-0 left-0 flex justify-between items-center w-full h-24' >
                <Link to= '/' className="ml-5">
                    <img src={Logo} alt="logo" width={'90px'}  />
                   {/*  <img src={Logo} alt="logo" width={'150px'}/> */}
                </Link>
        
                <h2 className="text-5xl">NEWS</h2>
                <Link to='/auth/login' > <FiUserPlus size="35px" className="mr-5"
               />
                </Link>
                
            
            {/*   <div><i className="fa-solid fa-user-plus p-2"></i></div> */}
    
            
                
            </header>
       
  
        

    )
}

export default Header;