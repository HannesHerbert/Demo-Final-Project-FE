import { HiOutlineNewspaper } from 'react-icons/hi';
import { BsPencilSquare } from 'react-icons/bs';
import { AiOutlineStar } from 'react-icons/ai';
import { BsChatText } from 'react-icons/bs';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';



function Nav() {
  return (

    <nav className="fixed bottom-0 left-0 w-full h-20 z-40">
      <ul className="flex justify-around items-center h-full text-xl text-gray-300 bg-black">


        <li className="hover:text-gray-600">
          <Link to="/">
          <HiOutlineNewspaper
              size="25px"
              className='mx-auto'
            />
            <p className="title-nav p-2 text-xs ">News</p>
          </Link>
        </li>

        <li className="hover:text-gray-600">
          <Link to="/favs">
          <AiOutlineStar
              size="25px"
              className='mx-auto'
            />
            <p className="title-nav p-2 text-xs">Favs</p>
          </Link>
        </li>

        <li className="  text-indigo-600 hover:text-gray-600 ">
          <Link to='/create'>
            <AiOutlinePlusCircle
              className=" circle-plus text-4xl"
              title='New Post'
            />
          </Link>
        </li>

        <li className="hover:text-gray-600">
          <Link to="/blogs">
          <BsPencilSquare
              size="25px "
              className='mx-auto'
            />
            <p className="title-nav p-2 text-xs">Blogs</p>
          </Link>
        </li>
        
        <li className="hover:text-gray-600">
          <Link to="/chat">
            <BsChatText
              size="24px"
              className='mx-auto'
            />
            <p className="title-nav p-2 text-xs">Chat</p>
          </Link>
        </li>

      </ul>
    </nav>
  );
}



export default Nav;