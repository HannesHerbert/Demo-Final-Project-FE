import {Link, Outlet} from 'react-router-dom';
import { useEffect } from 'react';



function Layout() {
    // const isAuthenticated = useAuthStore(state => state.isAuthenticated());
    // const user = useAuthStore((state) => state.user);
    // const token = useAuthStore(state => state.getToken());
    // const validateToken = useAuthStore(state => state.validateToken);

    // Auto Auth
    // useEffect(() => {
    //     if (token && !isAuthenticated) {
    //         validateToken()
    //     }
    // }, []);

    return (
        <>
            <header className='fixed top-0 left-0'>
                <Link>
                    <img src="../assets/boardergram-logo.png" alt="logo" />
                </Link>
            </header>

            <nav className='mb-10 fixed bottom-0 left-0'>
                <ul 
                className='flex gap-5 justify-center text-3xl font-bold text-gray-400 '
                >
                    <li className='hover:text-white'>
                        <Link to='/'>
                            News
                        </Link>
                    </li>
                    <li className='hover:text-white transition-colors duration-300'>
                        <Link to='/blogs'>
                            Blogs
                        </Link>
                    </li>
                    <li className='hover:text-white transition-colors duration-300'>
                        <Link to='/chats'>
                            Chats
                        </Link>
                    </li>
                    <li className='hover:text-white transition-colors duration-300'>
                        <Link to='/reviews'>
                            Reviews
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* {<h2 style={{textAlign: 'center', fontSize: '18sp'}}>Welcome aboard, {isAuthenticated ? user.fullname : 'Anonymous'}!</h2>} */}

            {/* <Notification /> */}
            {/* <UserAuth /> */}

            <Outlet />
        </>
    );
}

export default Layout;