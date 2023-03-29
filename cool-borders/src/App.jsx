import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chats from './pages/Chats';
import Layout from './pages/Layout';
import Management from './pages/Management';
import News from './pages/News';
import Regitster from './pages/Register';
import Reviews from './pages/Reviews';
import UserProfile from './pages/UserProfile';
import PrivateRoute from './services/PrivateRoute';



function App() {


  return (
    <div className="App bg-zinc-800 text-white py-5">
      <div className='container mx-auto min-h-screen relative  w-5/6'>
        <h1 className='text-4xl text-center py-9 mb-3 font-bold text-gray-300'>Timur's Todo App</h1>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<News />}/>

              <Route path='/auth/register' element={<Regitster />} />
              <Route path='/auth/login' element={<Login />} />

              <Route element={<PrivateRoute />}>
                <Route path='/blogs' element={<Blogs />} />
                <Route path='/reviews' element={<Reviews />} />
                <Route path='/chat' element={<Chats />} />

                <Route path='/management' element={<Management />} />

                <Route path='/user' element={<UserProfile />} />
              </Route>
            </Route>
            
          </Routes>
        </BrowserRouter>

      </div>
    </div>
  )
}

export default App
