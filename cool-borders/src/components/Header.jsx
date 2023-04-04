import { Link } from "react-router-dom";
/* import Logo1 from '../assets/LOgoW.png'; */
import Logo from '../assets/logo2.png';

import{FiUserPlus} from 'react-icons/fi'

function Header() {
    


    return(
        
            <header className='fixed top-0 left-0 flex justify-between items-center w-full h-24 '  >
                <Link to= '/'>
                    <img src={Logo} alt="logo" width={'90px'}  />
                   {/*  <img src={Logo} alt="logo" width={'150px'}/> */}
                </Link>
        
              {/*   <Link to='/news'> <h2 className='text-5xl font-mono font-black tracking-widest text-orange-500'>NEWS</h2></Link> */}
                <Link to='/auth/login' > <FiUserPlus size="25px" className="mr-5 hover:text-orange-300"
               />
                </Link>
                
            
            {/*   <div><i className="fa-solid fa-user-plus p-2"></i></div> */}
    
            
                
            </header>
       
  
        

    )
}

export default Header;