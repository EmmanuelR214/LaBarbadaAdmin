import { RouterProvider } from "react-router-dom"
import { route } from "./routes/Route"
import { AdminProvider } from "./routes/context/AuthAdminContext"

function App() {
  return (
    <>
    <AdminProvider>
      <RouterProvider router={route} />
    </AdminProvider>
    </>
  )
}

export default App
