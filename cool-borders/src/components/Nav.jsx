import { HiOutlineNewspaper } from 'react-icons/hi';
import {BsPencilSquare}  from 'react-icons/bs';
import {AiOutlineStar}  from 'react-icons/ai';
import {BsChatText}from 'react-icons/bs';
import {BsPlusCircleFill} from 'react-icons/bs';
import {Link} from 'react-router-dom';



function Nav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full h-24  font-mono">
      <ul className="flex justify-around items-center h-full text-1xl font-bold text-gray-600">
        <li className="hover:text-orange-500 duration-300 ">
          <Link to="/">
            <HiOutlineNewspaper
              size="30px"
              className='mx-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'
            />
            <p className="title-nav p-2 text-xs ">News</p>
          </Link>
        </li>
        <li className="hover:text-orange-500  duration-300">
          <Link to="/">
            <BsPencilSquare
              size="30px "
              className='mx-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'
            />
            <p className="title-nav p-2 text-xs">Blog</p>
          </Link>
        </li>
        
        <li className=" text-orange-500 duration-300 hover:text-amber-600 ">
          <Link to='/create'>
   
              <BsPlusCircleFill
                className="circle-plus transition ease-in delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
                size="50px"
                
                
              />
         
          </Link>
        </li>
        <li className="hover:text-orange-500 duration-300">
          <Link to="/">
            <AiOutlineStar
              size="30px"
              className='mx-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'
            />
            <p className="title-nav p-2 text-xs">Favs</p>
          </Link>
        </li>
        <li className="hover:text-orange-500 duration-300">
          <Link to="/">
            <BsChatText
              size="30px"
              className='mx-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'
            />
            <p className="title-nav p-2 text-xs">Chat</p>
          </Link>
        </li>
      
      </ul>
    </nav>
  );
}



export default Nav;