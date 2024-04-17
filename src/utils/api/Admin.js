import axios from "./axios";

export const verifyRoute = () => axios.get('/verify-admin')

export const DatosPlatillosRoute = () => axios.get('/datos-platillo')

export const ListaPlatillosRoute = () => axios.get('/lista-platillos')

export const NuevoPlatilloRoute = platillo => axios.post('/new-platillo', platillo)	

export const DatosActualizarPlatilloRoute = id => axios.post('/platillo-actializar', id)

export const LoginAdmin = user => axios.post('/login-admin', user)