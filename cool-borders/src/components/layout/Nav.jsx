import { HiOutlineNewspaper } from 'react-icons/hi';
import { BsPencilSquare } from 'react-icons/bs';
import { AiOutlineStar } from 'react-icons/ai';
import { HiMagnifyingGlass } from 'react-icons/hi';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { navLink, activeNav } from '../../services/styles.js';



function Nav() {

  const location = useLocation();
  let isNews;
  let isBlogs;
  let isFavs;
  let isChat;

  (location.pathname === '/' ? isNews = activeNav : isNews = "");
  (location.pathname === '/blogs' ? isBlogs = activeNav : isBlogs = "");
  (location.pathname === '/favs' ? isFavs = activeNav : isFavs = "");
  (location.pathname === '/chat' ? isChat = activeNav : isChat = "")



  return (
    /*  <nav className="fixed bottom-0 left-0 w-full h-full md:h-20 z-40">
       <ul className="flex justify-around items-center h-full text-xl text-gray-500 bg-gray-100"> */

    <nav className="fixed bottom-0 left-0 w-full h-20 z-40">
      <ul className="flex justify-around items-center h-full text-xl text-gray-300 bg-black">


        <li className={`${navLink} ${isNews}`}>
          <Link to="/">
            <HiOutlineNewspaper
              size="25px"
              className='mx-auto'
            />
            <p className="title-nav p-2 text-xs ">News</p>
          </Link>
        </li>

        <li className={`${navLink} ${isFavs}`}>
          <Link to="/favs">
            <AiOutlineStar
              size="25px"
              className='mx-auto'
            />
            <p className="title-nav p-2 text-xs">Favs</p>
          </Link>
        </li>

        <li className={`text-indigo-600 ${navLink}`}>
          <Link to='/create'>
            <AiOutlinePlusCircle
              className=" circle-plus text-4xl"
              title='New Post'
            />
          </Link>
        </li>

        <li className={`${navLink} ${isBlogs}`}>
          <Link to="/blogs">
            <BsPencilSquare
              size="25px "
              className='mx-auto'
            />
            <p className="title-nav p-2 text-xs">Blogs</p>
          </Link>
        </li>

        <li className={`${navLink} ${isChat}`}>
          <Link to="/chat">
            <HiMagnifyingGlass
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