import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/adminPage'
import HomePage from './pages/home'
import LogInPage from './pages/logIn'
import RegisterPage from './pages/register'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast'


function App() {
  

  return (
   <BrowserRouter>
      <div>
        <Toaster/>
        <Routes path='/*'>
          <Route path='/login' element={<LogInPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/admin/*' element={<AdminPage />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/*' element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
