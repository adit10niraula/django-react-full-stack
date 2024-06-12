import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'


function logout(){
  localStorage.clear()
  return <Navigate to="/login"/>

}
function RegisterLogout(){
  localStorage.clear()
  return <Register />
}


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/logout" element={<logout/>} />
      <Route path="/register" element={<RegisterLogout/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    
    
    </BrowserRouter>
  )
}

export default App
