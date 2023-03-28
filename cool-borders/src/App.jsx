import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import PrivateRoute from './services/PrivateRoute';



function App() {


  return (
    <div className="App bg-zinc-800 text-white py-5">
      <div className='container mx-auto min-h-screen relative  w-5/6'>
        <h1 className='text-4xl text-center py-9 mb-3 font-bold text-gray-300'>Timur's Todo App</h1>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              {/* <Route index element={}/>

              <Route path='/auth/register' element={} />
              <Route path='/auth/login' element={} /> */}

              <Route element={<PrivateRoute />}>
                {/* <Route path='/todolists' element={} />
                <Route path='/users/user' element={} /> */}
              </Route>
            </Route>
            
          </Routes>
        </BrowserRouter>

      </div>
    </div>
  )
}

export default App
