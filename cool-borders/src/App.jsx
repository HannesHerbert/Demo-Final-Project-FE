import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chats from './pages/Chats';
import Layout from './pages/Layout';
import Management from './pages/Management';
import News from './pages/News';
import Reviews from './pages/Reviews';
import UserProfile from './pages/UserProfile';
import PrivateRoute from './services/PrivateRoute';
import Login from './pages/Login'
import Blogs from './pages/Blogs'
import Register from './pages/Register';
import Create from './pages/Create';

function App() {


  return (
    <div className="App bg-zinc-800 text-white py-5">
      <div className='container mx-auto min-h-screen relative  w-5/6'>


        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<News />}/>

              <Route path='/auth/register' element={<Register />} />
              <Route path='/auth/login' element={<Login />} />
              <Route path='/create' element={<Create />} />
              
              <Route path='/user' element={<UserProfile />} />

              <Route element={<PrivateRoute />}>
                <Route path='/blogs' element={<Blogs />} />
                <Route path='/reviews' element={<Reviews />} />
           
                <Route path='/chat' element={<Chats />} />

                <Route path='/management' element={<Management />} />

              </Route>
            </Route>
            
          </Routes>
        </BrowserRouter>

      </div>
    </div>
  )
}

export default App
