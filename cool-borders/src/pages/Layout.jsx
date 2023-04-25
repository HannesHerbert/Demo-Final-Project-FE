import {Link, Outlet} from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/layout/Header';
import useAuthStore from '../store/useAuthStore';
import Nav from '../components/layout/Nav';
import RegisterNotification from '../components/register/RegisterNotification';



function Layout() {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated());
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore(state => state.getToken());
    const validateToken = useAuthStore(state => state.validateToken);

    //Auto Auth
    useEffect(() => {
        if (token && !isAuthenticated) {
            validateToken();
        }
    }, []);


    return (
        <div className='container mx-auto min-h-screen relative w-5/6 '>  
            <Header  />

            <Nav  />

            <RegisterNotification />

            <div className='container min-h-screen py-24'> 
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;