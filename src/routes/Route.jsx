import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import NotFound from "./NotFound";

//paginas publicas

//Store
import Login from "../views/Login";
import Home from "../views/Home";
import LayoutPrivate from "./LayoutPrivate";
import Productos from "../views/Productos";
import Reportes from "../views/Reportes";
import Publi from "../views/Publi";
import User from "../views/User";


export const route = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <NotFound/>,
    children:[
      {
        index: true,
        element: <Login/>
      },
      {
        path: '/',
        element: <LayoutPrivate/>,
        children:[
          {
            index: true,
            path: '/home',
            element: <Home/>
          },
          {
            path: '/platillos',
            element: <Productos/>
          },
          {
            path: '/reportes',
            element: <Reportes/>
          },
          {
            path: '/publi',
            element: <Publi/>
          },
          {
            path: '/user',
            element: <User/>
          }
        ]
      }
    ]
  }
])
// {
//   path:'/',
//   element: <ProtectedRoute/>,
//   children:[
//     {
//       index: true,
//       element: <Home/>
//     },
//   ]
// }