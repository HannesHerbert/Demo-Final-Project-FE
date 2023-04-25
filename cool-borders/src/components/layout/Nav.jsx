import { HiOutlineNewspaper } from 'react-icons/hi';
import { BsPencilSquare } from 'react-icons/bs';
import { AiOutlineStar } from 'react-icons/ai';
import { ImSearch } from 'react-icons/im';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { navLink, activeNav } from '../../services/styles.js';

function Nav() {

  const location = useLocation();
  let isNews;
  let isBlogs;
  let isFavs;
  let isSearch;

  (location.pathname === '/' ? isNews = activeNav : isNews = "");
  (location.pathname === '/blogs' ? isBlogs = activeNav : isBlogs = "");
  (location.pathname === '/favs' ? isFavs = activeNav : isFavs = "");
  (location.pathname === '/search' ? isSearch = activeNav : isSearch = "")



  return (


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

        <li className={`text-indigo-400  ${navLink}`}>
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

        <li className={`${navLink} ${isSearch}`}>
          <Link to="/search">
            <ImSearch
              size="24px"
              className='mx-auto'
            />
            <p className="p-2 text-xs">Search</p>
          </Link>
        </li>

      </ul>
    </nav>
  );
}



export default Nav;