import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAdmin } from '../routes/context/AuthAdminContext';

import { InputEmail , InputPassword, } from '../components/Inputs';
import { ButtonBasic } from '../components/Buttons';
import { useEffect } from 'react';


const Login = () => {
  const {register, handleSubmit, formState: {errors}, setValue, watch, trigger } = useForm()
  const {LoginAD, isAdmin} = useAdmin()
  const navigate = useNavigate()
  
  useEffect(() => {
    if(isAdmin) navigate('/home')
  })
  
  
  const handleSendCode = handleSubmit(async(values) =>{
    try {
      await LoginAD(values.correo, values.pass)
    } catch (error) {
      console.log('error',error)
    }
  })
  return (
    <div>
  <div className="min-h-screen">
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-full md:w-96">
              <div className="bg-zinc-800 p-4 shadow-white rounded-md">
                <div className="min-h-20 flex items-center justify-center mb-6">
                  <img src="/img/emblema.png" alt="Logo de la Empresa" className="w-full max-w-full max-h-full" />
                </div>
                <div className="text-center" >
                  <h2 className="mb-1 text-magenta text-gray-200 font-bold">Inicio de sesión de Administrador</h2>
                  <p className="text-gray-400 mb-4">Acceso a personal autorizado</p>
                  </div>
                  <form onSubmit={handleSendCode} className="space-y-5">
                  <InputEmail title='Correo' name='correo' min='10' max='100' err={errors} method={register} look={watch} /> 
                  <InputPassword title='Contraseña' name='pass' min='8' max='16' err={errors} method={register} look={watch} val={setValue} triger={trigger} />
                  <ButtonBasic text="Iniciar sesion" />
                  </form>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default Login