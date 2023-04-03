import { HiOutlineNewspaper } from 'react-icons/hi';
import {BsPencilSquare}  from 'react-icons/bs';
import {AiOutlineStar}  from 'react-icons/ai';
import {BsChatText}from 'react-icons/bs';
import {HiPlusCircle} from 'react-icons/hi';
import{AiOutlineMail} from 'react-icons/ai';
import {Link} from 'react-router-dom';



function Nav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full h-24 ">
      <ul className="flex justify-around items-center h-full text-1xl font-bold text-gray-400">
        <li className="hover:text-orange-400 duration-300">
          <Link to="/">
            <HiOutlineNewspaper
              size="25px"
              className='mx-auto '
            //   onMouseOver={({ target }) => (target.style.color = "orange")}
            //   onMouseOut={({ target }) => (target.style.color = "white")}
            />
            <p className="title-nav ">News</p>
          </Link>
        </li>
        <li className="text transition-colors duration-300">
          <Link to="/blogs">
            <div className="icondiv">
              <BsPencilSquare
                size="25px"
                onMouseOver={({ target }) => (target.style.color = "orange")}
                onMouseOut={({ target }) => (target.style.color = "white")}
              />
              <p className="title-nav">Blogs</p>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/createblog">
            <div className="icondiv">
              {/* <AiOutlinePlusCircle className='fa-circle-plus'/> */}
              <HiPlusCircle
                className="circle-plus"
                size="60px"
                onMouseOver={({ target }) =>
                  (target.style.color = "rgba(253,181,45,1)")
                }
              />
            </div>
          </Link>
        </li>

        <li className="text transition-colors duration-300">
          <Link to="/favs">
            <AiOutlineStar
              size="25px"
              onMouseOver={({ target }) => (target.style.color = "orange")}
              onMouseOut={({ target }) => (target.style.color = "white")}
            />
            <p className="title-nav">Favs</p>
          </Link>
        </li>
        <li className="text transition-colors duration-300">
          <Link to="/chats">
            <BsChatText
              size="25px"
              onMouseOver={({ target }) => (target.style.color = "orange")}
              onMouseOut={({ target }) => (target.style.color = "white")}
            />
            <p className="title-nav">Chat</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}



export default Nav;