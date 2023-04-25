import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* ------- PAGES ---------------- */
import Chats from './pages/Chats';
import Layout from './pages/Layout';
import News from './pages/News';
import UserProfile from './pages/UserProfile';
import PrivateRoute from './services/PrivateRoute';
import Login from './pages/Login'
import Blogs from './pages/Blogs'

import Create from './pages/Create';
import Favs from './pages/Favs';
import Register from './pages/Register';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {


  return (
    <div className="App text-black text-title py-2 bg-black h-full ">
      {/*  <div className="App text-black text-title py-2 bg-gray-100 h-full "> */}


      <div className='container mx-auto min-h-full relative  w-5/6 '>

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
                <Route path='/chat' element={<Chats />} />
              </Route>

              <Route path='/admin' element={<AdminDashboard />} />

            </Route>

          </Routes>
        </BrowserRouter>

      </div>
    </div>
  )
}

export default App
