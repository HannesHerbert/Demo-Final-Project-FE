import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* ------- PAGES ---------------- */
import Search from './pages/Search';
import Layout from './pages/Layout';
import News from './pages/News';
import UserProfile from './pages/UserProfile';
import PrivateRoute from './services/PrivateRoute';
import Login from './pages/Login'
import Blogs from './pages/Blogs'

import Create from './pages/Create';
import Favs from './pages/Favs';
import UserManagement from './pages/UserManagement';
import Register from './pages/Register';
import UserInfo from './pages/UserInfo';

function App() {


  return (
    <div className="App text-black font-mono  bg-black min-h-screen ">
    
      {/* <div className='container mx-auto h-full relative w-5/6 '> */}

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<News />} />

              <Route path='/auth/register' element={<Register />} />
              <Route path='/auth/login' element={<Login />} />

              <Route element={<PrivateRoute />}>
                <Route path='/user' element={<UserProfile />} />
                <Route path='/create' element={<Create />} />
                <Route path='/blogs' element={<Blogs />} />
                <Route path='/favs' element={<Favs />} />
                <Route path='/news' element={<News />} />

                <Route path='/search' element={<Search />} />
                <Route path='/users/:username' element={<UserInfo />} />

              <Route path='/usermanagement' element={<UserManagement />} />

              </Route>
            </Route>

          </Routes>
        </BrowserRouter>

      </div>
    // </div>
  )
}

export default App
