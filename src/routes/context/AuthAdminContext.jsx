import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { DatosActualizarPlatilloRoute, DatosPlatillosRoute, ListaPlatillosRoute, LoginAdmin, NuevoPlatilloRoute, verifyRoute } from "../../utils/api/Admin";
//Api
import axios from "axios";


export const AdminContext = createContext()

export const useAdmin = () =>{
  const context = useContext(AdminContext)
  if(!context)  throw new Error('Error de provedor con AdminContextPublic')
  return context
}

export const AdminProvider = ({children}) =>{
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [categorias, setCategorias] = useState([])
  const [tamaños, setTamaños] = useState([])
  const [presentaciones, setPresentaciones] = useState([])
  const [platillos, setPlatillos] = useState([])
  const [guarniciones, setGuarniciones] = useState([])
  const [errorAuth, setErrorAuth] = useState([])
  const [successAuth, setSuccessAuth] = useState([])
  const [listPlatillo, setListPlatillo] = useState([])
  
  
  const NuevoPlatillo = async(nombrePlatillo, descripcionPlatillo, opcionCategoria, img, combinaciones, platillosExtra, platillosGuarniciones, imagen) =>{
    try {
      const datos = {
        platillo: nombrePlatillo,
        descripcion: descripcionPlatillo,
        categoria: opcionCategoria,
        imagen: img,
        combinaciones: combinaciones,
        extras: platillosExtra,
        guarniciones: platillosGuarniciones,
        archivoImg: imagen
      }
      const pp = await NuevoPlatilloRoute(datos)
      if(pp){
        setTamaños([])
        setCategorias([])
        setPresentaciones([])
        setPlatillos([])
        setGuarniciones([])
      }
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
      setErrorAuth(error.response.data)
    }
  }
  
  const SubirImagen = async (imagen) => {
    try {
      console.log(imagen);
      const formData = new FormData();
      formData.append("imagen", imagen);
      const pp = await axios.post('https://labarbada.store/subirImagen.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return pp
    } catch (error) {
      console.log(error);
    }
  };
  
  
  const DatosPlatilloActualizar = async(id) =>{
    try {
      const ID = {
        id: id
      }
      const datos = await DatosActualizarPlatilloRoute(ID)
      setPlatillos(datos.data[0])
      console.log(datos.data[0])
    } catch (error) {
    if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
    setErrorAuth(error.response.data)
    }
  }
  
  const DatosPlatillo = async() =>{
    try {
      const d = await DatosPlatillosRoute()
      setTamaños(d.data[0])
      setCategorias(d.data[1])
      setPresentaciones(d.data[2])
      setPlatillos(d.data[3])
      setGuarniciones(d.data[4])
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
      setErrorAuth(error.response.data)
    }
  }
  
  
  
  
  const Logout = async() =>{
    try {
      console.log('Entro aqui')
      Cookies.remove('tokenadmin')
      Cookies.remove('rol')
      setIsAdmin(false)
      setUser(null)
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
      setErrorAuth(error.response.data)
    }
  }
  const LoginAD = async(tel, pass) =>{
    try {
      const data = {
        telefono: tel,
        password: pass
      }
      const res = await LoginAdmin(data)
      setUser(res.data.user)
      setIsAdmin(true)
      setSuccessAuth(['¡Bienvenido!'])
    } catch (error) {
      if(Array.isArray(error.response.data)) setErrorAuth(error.response.data)
      setErrorAuth(error.response.data)
    }
  }
  
  useEffect(()=>{
    if(errorAuth.length > 0 || successAuth.length > 0){
      if (errorAuth && Array.isArray(errorAuth)) {
        errorAuth.forEach((error) => toast.error(error));
      }
      
      if(successAuth) {
        successAuth.forEach((success) => toast.success(success))
      }
      const timer = setTimeout(()=>{
        setErrorAuth([])
        setSuccessAuth([])
      },3000)
      return () => clearTimeout(timer)
    }
  },[errorAuth, successAuth])
  
  
  useEffect(()=>{
    async function chackLogin  () {
      try {
        const si = await ListaPlatillosRoute()
        setListPlatillo(si.data)
        
        const cookie = Cookies.get()
        if(!cookie.tokenadmin && !cookie.rol) {
          setIsAdmin(false)
          setLoading(false)
          return setUser(null)
        }
        const res = await verifyRoute(cookie.tokenadmin)  
        if(!res.data) {
          setIsAdmin(false)
          setLoading(false)
          return;
        }
        setIsAdmin(true)
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        setIsAdmin(false)
        setUser(null)
        setLoading(false)
      }
    }
    chackLogin()
  },[listPlatillo])

  return(
    <AdminContext.Provider value={{
      user,
      isAdmin,
      loading,
      
      
      LoginAD,
      Logout,
      
      
      categorias,
      listPlatillo,
      presentaciones,
      tamaños,
      platillos, 
      guarniciones,
      DatosPlatillo,
      NuevoPlatillo,
      SubirImagen,
      DatosPlatilloActualizar,
    }} >
      {children}
    </AdminContext.Provider>
  )
}