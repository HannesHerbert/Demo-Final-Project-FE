import { Link } from "react-router-dom";
import Logo1 from '../assets/LOgoW.png';
import Logo from '../assets/logoO.png';


function Header() {
    


    return(
        <header className='fixed top-0 left-0 flex justify-between w-full items-center' >
            <Link to= '/'>
                {/* <img src={Logo1} alt="logo" width={'100px'}/> */}
                <img src={Logo} alt="logo" width={'70px'}/>
            </Link>
     
            <h2 className="text-5xl">NEWS</h2>
            <div><i className="fa-solid fa-user-plus p-2"></i></div>
  
           
            
        </header>
    )
}

export default Header;