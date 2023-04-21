import {Link, Outlet} from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Header';
import useAuthStore from '../store/useAuthStore';
import Nav from '../components/Nav';
import RegisterNotification from '../components/register/RegisterNotification';



function Layout() {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated());
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore(state => state.getToken());
    const validateToken = useAuthStore(state => state.validateToken);

    //Auto Auth
    useEffect(() => {
        if (token && !isAuthenticated) {
            validateToken()
            console.log(user)
        }
    }, []);

    return (
        <div >  
        
            <Header  />

            <Nav  />
            {/* {<h2 style={{textAlign: 'center', fontSize: '18sp'}}>Welcome aboard, {isAuthenticated ? user.fullname : 'Anonymous'}!</h2>} */}

            <RegisterNotification />
            {/* <UserAuth /> */}

            <div className='h-full mt-24 mb-24'> 
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;