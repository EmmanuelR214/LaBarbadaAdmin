import React, { useEffect, useState } from 'react'
import { Navigate, Link, Outlet, useLocation } from 'react-router-dom'
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useAdmin } from './context/AuthAdminContext';

const LayoutPrivate = () => {
  const local = useLocation()
  const {Logout} = useAdmin()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const {isAdmin} = useAdmin()  
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  }
  
  if(!isAdmin) return <Navigate to='/' replace />
  
  
  return (
    <>
      <div
      className={`fixed left-0 top-0 w-64 h-full bg-stone-800 p-4 z-50 sidebar-menu transition-transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <Link to='/home' className="flex items-center pb-4 border-b border-b-white">
        <img src="/img/logo.png" alt="" className="w-6 h-6 object-cover" />
        <span className="text-lg font-bold text-white ml-3">Administrador</span>
      </Link>
      <ul className="mt-4 bg">
        <li className="mb-1">
          <Link to='/platillos'  className="flex items-center py-2 px-4 text-gray-300 hover:bg-red-600 hover:text-gray-100 rounded-md">
            <Icon icon="fluent:food-16-filled" className="text-xl" />
            <span className="text-lg">Platillos</span>
          </Link>
        </li>
        <li className="mb-1">
          <Link to='/reportes'  className="flex items-center py-2 px-4 text-gray-300 hover:bg-red-600 hover:text-gray-100 rounded-md">
            <Icon icon="flowbite:clipboard-list-outline" className="text-xl"/>
            <span className="text-lg">Reportes</span>
          </Link>
        </li>
        <li className="mb-1">
          <Link to='/publi' className="flex items-center py-2 px-4 text-gray-300 hover:bg-red-600 hover:text-gray-100 rounded-md">
            <Icon icon="ri:image-add-fill" className="text-xl" />
            <span className="text-lg">Publicidad</span>
          </Link>
        </li>
        {/* <li className="mb-1">
          <Link to='/'  className="flex items-center py-2 px-4 text-gray-300 hover:bg-red-600 hover:text-gray-100 rounded-md">
            <Icon icon="mdi:star-plus" className="text-xl" />
            <span className="text-lg">Guarniciones</span>
          </Link>
        </li> */}
        <li className="absolute bottom-0 mb-1">
          <Link to='/user' className="flex items-center py-2 px-4 text-white hover:bg-red-600 hover:text-gray-100 rounded-md" >
            <span className="text-lg pr-2">Usuarios</span>
            <Icon icon="" className="text-xl" />
          </Link>
          <Link to='/' onClick={()=>{Logout()}} className="flex items-center py-2 px-4 text-white hover:bg-red-600 hover:text-gray-100 rounded-md" >
            <span className="text-lg pr-2">Cerrar sesión</span>
            <Icon icon="ic:outline-logout" className="text-xl" />
          </Link>
        </li>
      </ul>
    </div>
    <div className={`fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay ${sidebarOpen ? "block" : "hidden"}`} onClick={closeSidebar}></div>
    <section className={` transition-all main ${sidebarOpen ? "pl-64" : ""}`}>
      <div className="py-2 px-6 flex items-center shadow-md shadow-white/5 sticky top-0 left-0 z-30 w-full">
        <button type="button" className="text-lg text-gray-600" onClick={toggleSidebar}>
            <Icon icon="iconamoon:menu-burger-horizontal-light" className="text-2xl"/>
        </button>
        <ul className="flex items-center text-sm ml-4">
          <li className="mr-2">
            <a href="#" className="text-white hover:text-gray-600 font-medium">Administrador</a>
          </li>
          <li className="text-gray-600 mr-2 font-medium">{local.pathname}</li>
        </ul>
      </div>
      <Outlet/>
    </section>
  </>
  )
}

export default LayoutPrivate