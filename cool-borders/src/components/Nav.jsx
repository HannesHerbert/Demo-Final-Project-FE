import { HiOutlineNewspaper } from 'react-icons/hi';
import { BsPencilSquare } from 'react-icons/bs';
import { AiOutlineStar } from 'react-icons/ai';
import { BsChatText } from 'react-icons/bs';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';



function Nav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full h-20 font-mono">
      <ul className="flex justify-around items-center h-full text-xl font-bold text-gray-400 bg-black">

        <li className="hover:text-orange-700 duration-300 ">
          <Link to="/">
            <HiOutlineNewspaper
              size="25px"
              className='mx-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 '
            />
            <p className="title-nav p-2 text-xs ">News</p>
          </Link>
        </li>

        <li className="hover:text-orange-700 duration-300">
          <Link to="/favs">
            <AiOutlineStar
              size="25px"
              className='mx-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'
            />
            <p className="title-nav p-2 text-xs">Favs</p>
          </Link>
        </li>

        <li className="  text-orange-700 duration-300 hover:text-gray-400 ">
          <Link to='/create'>
            <AiOutlinePlusCircle
              className=" circle-plus transition ease-in delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
              size="45px"
            />
          </Link>
        </li>

        <li className="hover:text-orange-700 duration-300 ">
          <Link to="/blogs">
            <BsPencilSquare
              size="25px "
              className='mx-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300'
            />
            <p className="title-nav p-2 text-xs">Blogs</p>
          </Link>
        </li>
        
        <li className="hover:text-orange-700 duration-300">
          <Link to="/chat">
            <BsChatText
              size="24px"
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