import  {Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import React from 'react'

const Layout = () => {
  return (
    <>    
    <ToastContainer pauseOnHover={false} autoClose={2000} />
    <main>
      <Outlet/>
    </main>
    </>
  )
}

export default Layout