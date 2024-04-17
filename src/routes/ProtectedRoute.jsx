import { Navigate, Outlet } from "react-router-dom"
// import { useAuth } from "./context/AuthContext"


export const ProtectedRoute = () => {
  
  // const {loading, isAuthenticade, user} = useAuth()
  const loading = true
  const isAuthenticade = true
  
  if(loading) return <h1>Loading...</h1>
  if(!loading && !isAuthenticade) return <Navigate to="/login" replace />
  
  return <Outlet/>
}