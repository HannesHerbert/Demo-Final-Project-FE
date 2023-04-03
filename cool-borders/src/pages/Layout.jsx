import {Link, Outlet} from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';

import Nav from '../components/Nav';
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
        
            <Header  />

            <Nav  />
            {/* {<h2 style={{textAlign: 'center', fontSize: '18sp'}}>Welcome aboard, {isAuthenticated ? user.fullname : 'Anonymous'}!</h2>} */}

            {/* <Notification /> */}
            {/* <UserAuth /> */}

            <div className='h-full mt-24 mb-24'> 
                <Outlet />
            </div>
        </>
    );
}

export default Layout;