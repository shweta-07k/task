import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Users from './pages/Users'
const App = () => {
  return <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Users />} />
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </>
}

export default App