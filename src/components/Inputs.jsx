import { useState, useEffect, useRef } from "react"
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import CurrencyInput from "react-currency-input-field";
import { Controller } from "react-hook-form";

export const InputDesign = ({
  title,
  name,
  max, 
  min,
  icon,
  border ="border border-black",

  method,
  err,
  look,
  
}) =>{ 
  const [isFocused, setIsFocused] = useState(false)
  
  const handleFocus = () => {
    setIsFocused(true)
  }
  
  const handleBlur = (e) => {
    if (!e.target.value) {
      setIsFocused(false)
    }
  }
 

  return (
      <div className="relative w-full ">
        <div className="relative">
          <motion.label
            className={`absolute left-3  text-black ${
              isFocused ? " text-sm" : "text-gray-500 "
            } pointer-events-none`}
            animate={{ top: isFocused ? "-20px" : "20%" }}
            onClick={() => document.querySelector("input").focus()}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <label htmlFor="">{title}</label>
          </motion.label>
          <input
            type="text"
            {...method(name, {
              required: `${title} es requerido`,
              minLength: {
                value: min,
                message: `${title} debe ser mayor a ${min} carácteres`,
              },
              maxLength: {
                value: max,
                message: `${title} debe de ser menor a ${max} carácteres`,
              },
            })}
            className={`text-black rounded-lg p-3 pr-3 px-3 w-full focus:outline-none ${border}`}
   
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={look(name) || ''} 
          />
          <div className="absolute inset-y-0 right-0 flex items-center bg-transparent p-2">
            <Icon icon={icon} className="text-black text-2xl" />
          </div>
        </div>
        {err[name] && <p className="text-red-500 text-xs">{err[name]?.message}</p>}
      </div>
  )
}

export const InputPassword = ({
  title,
  name,
  max, 
  min,
  
  method,
  err,
  look,
  triger,
  val,
}) =>{ 
  const [isFocused, setIsFocused] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [errorMess, setErrorMess] = useState([])
  const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).*$/
  
  const handleChange = (e) =>{
    const newErrorMess = []
    const input = e.target.value
    const mayus = /[A-Z]/.test(input)
    const minus = /[a-z]/.test(input)
    const num = /\d/.test(input)
    const carac = /[!@#$%^&*]/.test(input)
    
    if(name === 'pass'){
      const valPass = input.replace(/[^a-zA-Z0-9!@#$%^&*]/g, '')
      val(name, valPass)
      if (!mayus) newErrorMess.push('Debe contener al menos una letra mayúscula.')
      if (!minus) newErrorMess.push('Debe contener al menos una letra minúscula.')
      if (!num) newErrorMess.push('Debe contener al menos un número.')
      if (!carac) newErrorMess.push('Debe contener al menos uno de los siguientes carácteres especiales: !, @, #, $, %, ^, &, *.')
      setErrorMess(newErrorMess)
    }
    triger(name)
  }
  
  const handleFocus = () => {
    setIsFocused(true)
  }
  
  const handleBlur = (e) => {
    if (!e.target.value) {
      setIsFocused(false)
    }
  }
  return (
      <div className="relative w-full ">
        <div className="relative">
          <motion.label
            className={`absolute left-3 ${
              isFocused ? " text-sm" : "text-gray-500"
            } pointer-events-none`}
            animate={{ top: isFocused ? "-20px" : "20%" }}
            onClick={() => document.querySelector("input").focus()}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <label htmlFor="">{title}</label>
          </motion.label>
          <input
            type={showPass ? 'text' : 'password'}
            {...method(name, {
              required: `${title} es requerido`,
              pattern: pattern,
              minLength: {
                value: min,
                message: `${title} debe ser mayor a ${min} carácteres`,
              },
              maxLength: {
                value: max,
                message: `${title} debe de ser menor a ${max} carácteres`,
              },
            })}
            className="text-black rounded-lg p-3 pr-3 px-3 w-full focus:outline-none "
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            value={look(name) || ''} 
          />
          <motion.button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute inset-y-0 right-0 flex items-center p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon icon={showPass ? 'ph:eye' : 'mdi:eye-off-outline'} className="text-black text-2xl" />
          </motion.button>
        </div>
        {err[name] && <p className="text-red-500 text-xs">{err[name]?.message}</p>}
        <div className="w-full">
          {errorMess.map((message, index) => (
            <p key={index} className="text-red-500 text-xs">{message}</p>
          ))}
        </div> 
      </div>
  )
}

export const InputPasswordConfirm = ({
  title,
  name,
  max, 
  min,
  
  method,
  err,
  look,
  triger,
  val,
}) =>{ 
  const [isFocused, setIsFocused] = useState(false)
  const [showPass, setShowPass] = useState(false)  
  const handleChange = (e) =>{
    const input = e.target.value
    const valPass = input.replace(/[^a-zA-Z0-9!@#$%^&*]/g, '')
    val(name, valPass)
    triger(name)
  }
  
  const handleFocus = () => {
    setIsFocused(true)
  }
  
  const handleBlur = (e) => {
    if (!e.target.value) {
      setIsFocused(false)
    }
  }
  return (
      <div className="relative w-full ">
        <div className="relative">
          <motion.label
            className={`absolute left-3 ${
              isFocused ? " text-sm" : "text-gray-500"
            } pointer-events-none`}
            animate={{ top: isFocused ? "-20px" : "20%" }}
            onClick={() => document.querySelector("input").focus()}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <label htmlFor="">{title}</label>
          </motion.label>
          <input
            type={showPass ? 'text' : 'password'}
            {...method(name, {
              required: `${title} es requerido`,
              validate: (value) => value === look('pass') || 'Las contraseñas no coinciden',
              minLength: {
                value: min,
                message: `${title} debe ser mayor a ${min} carácteres`,
              },
              maxLength: {
                value: max,
                message: `${title} debe de ser menor a ${max} carácteres`,
              },
            })}
            className="text-black rounded-lg p-3 pr-3 px-3 w-full focus:outline-none "
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            value={look(name) || ''} 
          />
          <motion.button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute inset-y-0 right-0 flex items-center p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon icon={showPass ? 'ph:eye' : 'mdi:eye-off-outline'} className="text-black text-2xl" />
          </motion.button>
        </div>
        {err[name] && <p className="text-red-500 text-xs">{err[name]?.message}</p>}
        {err.passwordRepeat && ( 
          <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          <span className="font-medium">Oh, snapp!</span> {err.passwordRepeat.message}
          </p>
        )}
      </div>
  )
}

export const InputPhone = ({
  title,
  name,
  max, 
  min,
  
  method,
  err,
  look,
  triger,
  val,
}) =>{ 
  const [isFocused, setIsFocused] = useState(false)
  const icon = 'ph:phone-fill'
  const [errorMess, setErrorMess] = useState([])
  const pattern = /^[0-9]+$/
  
  const handleChange = (e) =>{
    const newErrorMess = []
    const input = e.target.value
    if(name === 'tel'){
      const valTel = input.replace(/[^0-9]/g, '').slice(0,10)
      if(input.length < 10) newErrorMess.push('El teléfonoo debe ser igual a 10 caracteres')
      val(name, valTel)
      setErrorMess(newErrorMess)
    }
    triger(name)
  }
  
  const handleFocus = () => {
    setIsFocused(true)
  }
  
  const handleBlur = (e) => {
    if (!e.target.value) {
      setIsFocused(false)
    }
  }
  return (
      <div className="relative w-full ">
        <div className="relative">
          <motion.label
            className={`absolute left-3 ${
              isFocused ? " text-sm" : "text-gray-500"
            } pointer-events-none`}
            animate={{ top: isFocused ? "-20px" : "20%" }}
            onClick={() => document.querySelector("input").focus()}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <label htmlFor="">{title}</label>
          </motion.label>
          <input
            type="tel"
            {...method(name, {
              required: `${title} es requerido`,
              pattern: pattern,
              minLength: {
                value: min,
                message: `${title} debe ser mayor a ${min} carácteres`,
              },
              maxLength: {
                value: max,
                message: `${title} debe de ser menor a ${max} carácteres`,
              },
            })}
            className="text-black rounded-lg p-3 pr-3 px-3 w-full focus:outline-none "
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            value={look(name) || ''} 
          />
          <div className="absolute inset-y-0 right-0 flex items-center bg-transparent p-2">
            <Icon icon={icon} className="text-black text-2xl" />
          </div>
        </div>
        {err[name] && <p className="text-red-500 text-xs">{err[name]?.message}</p>}
        <div className="w-full">
          {errorMess.map((message, index) => (
            <p key={index} className="text-red-500 text-xs">{message}</p>
          ))}
        </div> 
      </div>
  )
}

export const VerificationInput = ({
  title,
  name, 
  min,
  max,
  pattern,
  method,
  err,
  val
}) => {
  const [code, setCode] = useState('')
  const inputsRef = useRef([])
  
  useEffect(() => {
    val(name, code)
  }, [code, name, val])
  
  const handleChange = (index, e) => {
    let { value } = e.target;
    // Aplicar el patrón proporcionado
    if (pattern) {
      value = value.replace(new RegExp(pattern), '');
    }
    const newCode = [...code];
    newCode[index] = value;

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }

    setCode(newCode.join('').slice(0, 6));
  };
  
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus()
    }
  }
  return (
    <div>
      <div className="flex items-center justify-center text-black">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            {...method(name,{
              required: `${title} es requerido`,
              minLength: {
                value: min,
                message: `${title} debe ser mayor a ${min} caracteres`,
              },
              maxLength: {
                value: max,
                message: `${title} debe ser menor a ${max} caracteres`,
              },
            })}
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength={1}
            value={code[index] || ''}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-3xl text-center border rounded-md mx-1 focus:outline-none focus:border-blue-500"
          />
        ))}
      </div>
      {err[name] && <p className="text-red-500 text-xs">{err[name]?.message}</p>}
    </div>
  );
}

export const InputEmail = ({
  title,
  name,
  max, 
  min,
  
  method,
  err,
  look,
}) =>{ 
  const [isFocused, setIsFocused] = useState(false)
  const icon = 'material-symbols:mail-outline'
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  const handleFocus = () => {
    setIsFocused(true)
  }
  
  const handleBlur = (e) => {
    if (!e.target.value) {
      setIsFocused(false)
    }
  }
  return (
      <div className="relative w-full ">
        <div className="relative">
          <motion.label
            className={`absolute left-3 ${
              isFocused ? " text-sm" : "text-gray-500"
            } pointer-events-none`}
            animate={{ top: isFocused ? "-20px" : "20%" }}
            onClick={() => document.querySelector("input").focus()}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <label htmlFor="">{title}</label>
          </motion.label>
          <input
            type="email"
            {...method(name, {
              required: `${title} es requerido`,
              pattern: {
                value:pattern,
                message: 'Ingrese un correo electrónico válido'
              },
              minLength: {
                value: min,
                message: `${title} debe ser mayor a ${min} carácteres`,
              },
              maxLength: {
                value: max,
                message: `${title} debe de ser menor a ${max} carácteres`,
              },
            })}
            className="text-black rounded-lg p-3 pr-3 px-3 w-full focus:outline-none "
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={look(name) || ''} 
          />
          <div className="absolute inset-y-0 right-0 flex items-center bg-transparent p-2">
            <Icon icon={icon} className="text-black text-2xl" />
          </div>
        </div>
        {err[name] && <p className="text-red-500 text-xs">{err[name]?.message}</p>}
      </div>
  )
}

export const InputTextArea = ({
  title,
  name,
  max, 
  min,
  icon,
  border ="border border-black",

  method,
  err,
  look,
  
}) =>{ 
  const [isFocused, setIsFocused] = useState(false)
  
  const handleFocus = () => {
    setIsFocused(true)
  }
  
  const handleBlur = (e) => {
    if (!e.target.value) {
      setIsFocused(false)
    }
  }
 

  return (
      <div className="relative w-full ">
        <div className="relative">
          <motion.label
            className={`absolute left-3  text-black ${
              isFocused ? " text-sm" : "text-gray-500 "
            } pointer-events-none`}
            animate={{ top: isFocused ? "-20px" : "20%" }}
            onClick={() => document.querySelector("input").focus()}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <label htmlFor="">{title}</label>
          </motion.label>
          <textarea
            type="text"
            {...method(name, {
              required: `${title} es requerido`,
              minLength: {
                value: min,
                message: `${title} debe ser mayor a ${min} carácteres`,
              },
              maxLength: {
                value: max,
                message: `${title} debe de ser menor a ${max} carácteres`,
              },
            })}
            className={`text-black rounded-lg p-3 pr-3 px-3 w-full focus:outline-none ${border}`}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={look(name) || ''} 
            cols="30"
            rows="3"
          />
          <div className="absolute inset-y-0 right-0 flex items-center bg-transparent p-2">
            <Icon icon={icon} className="text-black text-2xl" />
          </div>
        </div>
        {err[name] && <p className="text-red-500 text-xs">{err[name]?.message}</p>}
      </div>
  )
}
// const InputMoney = ({ title, name, min, max, method, err, control, look }) => {
//   const [isFocused, setIsFocused] = useState(false);

//   const handleFocus = () => {
//     setIsFocused(true);
//   };

//   const handleBlur = () => {
//     setIsFocused(false);
//   };

//   return (
//     <div className="relative w-full">
//       <div className="relative">
//         <label
//           className={`absolute left-3 ${isFocused || look[name] ? 'text-sm' : 'text-gray-500'} pointer-events-none`}
//         >
//           {title}
//         </label>
//         <Controller
//           name={name}
//           control={control}
//           defaultValue=""
//           rules={{
//             required: `${title} es requerido`,
//             minLength: {
//               value: min,
//               message: `${title} debe ser mayor a ${min} caracteres`,
//             },
//             maxLength: {
//               value: max,
//               message: `${title} debe de ser menor a ${max} caracteres`,
//             },
//           }}
//           render={({ field }) => (
//             <CurrencyInput
//               {...field}
//               allowNegativeValue={false}
//               decimalsLimit={2}
//               prefix="$"
//               className="text-black rounded-lg p-3 pr-12 w-full focus:outline-none"
//               onFocus={handleFocus}
//               onBlur={handleBlur}
//             />
//           )}
//         />
//       </div>
//       {err[name] && <p className="text-red-500 text-xs">{err[name]?.message}</p>}
//     </div>
//   );
// };

// const CurrencyInput =({...inputProps}) => {
//   <MaskedInput mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} {...inputProps} />
// }

// +const defaultMaskOptions = {
//   prefix: '$',
//   suffix: '',
//   includeThousandsSeparator: true,
//   thousandsSeparatorSymbol: ',',
//   allowDecimal: true,
//   decimalSymbol: '.',
//   decimalLimit: 2, // how many digits allowed after the decimal
//   integerLimit: 7, // limit length of integer numbers
//   allowNegative: false,
//   allowLeadingZeroes: false,
//   }

//TODO: INPUTS ESPECIALES


export const InputSearch = () => {
  return (
      <div className="relative w-full ">
        <div className="relative">
          <input
            type="text"
            className="text-white rounded-lg p-3 pr-10 pl-12 px-3
              w-full focus:outline-none bg-zinc-800 text-xl" placeholder="Buscar"
          />
          <div className="absolute inset-y-0 left-0 flex items-center p-2 ">
            <Icon icon="material-symbols:search" className="text-white text-3xl" />
          </div>
        </div>
      </div>
  );
}

export const CustomSelect = ({ options, placeholder, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        className="appearance-none border-black border rounded px-3 py-2 w-full text-gray-700 leading-tight focus:outline-none pr-10 bg-white"
        onClick={toggleDropdown}
      >
        <div className="flex justify-between items-center">
          <span>{value ? value.label : placeholder}</span>
          <Icon
            icon="material-symbols:expand-more"
            className={`text-3xl text-black absolute right-1 flex items-center ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full max-h-28 overflow-y-auto overflow-x-hidden bg-white shadow-md mt-1 rounded border-black border text-black z-50" // Agrega overflow-x-hidden
          >
            <ul>
              {options.map((option, index) => (
                <li key={index} className="px-3 py-2 rounded hover:bg-gray-200">
                  <button
                    className="w-full text-left focus:outline-none"
                    onClick={(e) => {
                      e.preventDefault()
                      onChange(option);
                      toggleDropdown();
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const CustomSelectPlus = ({ options, placeholder, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    const selectedIndex = selectedOptions.findIndex((opt) => opt.value === option.value);
    if (selectedIndex > -1) {
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions.splice(selectedIndex, 1);
      setSelectedOptions(newSelectedOptions);
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const isSelected = (option) => {
    return selectedOptions.some((opt) => opt.value === option.value);
  };

  return (
    <div className="relative w-5/6">
      <div
        className="appearance-none px-3 py-2 w-full leading-tight focus:outline-none pr-10 border-b-2"
        onClick={toggleDropdown}
      >
        <div className="flex justify-between items-center">
          <span>{selectedOptions.length > 0 ? selectedOptions.map((opt) => opt.label).join(', ') : placeholder}</span>
          <Icon
            icon="material-symbols:expand-more"
            className={`text-3xl text-white mb-2 bg-red-600 rounded-full absolute right-1 flex items-center ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full bg-black shadow-md mt-1 border-b-2 text-white z-10 overflow-y-auto max-h-40" 
            style={{ scrollbarWidth: 'none', 'msOverflowStyle': 'auto', overflow: '-webkit-overflow-scrolling' }} 
          >
            <ul>
              {options.map((option, index) => (
                <li key={index} className="px-3 py-2 hover:bg-zinc-800 border-b-2">
                  <label htmlFor={`option-${index}`} className="cursor-pointer flex items-center">
                    <div>
                      <span>{option.label}</span>
                      <span className="text-red-600 text-sm font-medium block">{option.extraText}</span>
                    </div>
                    <input
                      type="checkbox"
                      id={`option-${index}`}
                      className={`ml-auto size-4 ${isSelected(option) ? 'bg-black' : ''}`}
                      checked={isSelected(option)}
                      onChange={() => handleOptionClick(option)}
                    />
                  </label>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}