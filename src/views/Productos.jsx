import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CustomSelect, InputDesign, CustomSelectPlus, InputTextArea, InputSearch } from '../components/Inputs'
import { TablaComponentes } from '../components/TablaComponentes '
import { useAdmin } from '../routes/context/AuthAdminContext'
import { ButtonBasic } from '../components/Buttons'
import Modal from '../components/Modal'
import { toast } from 'react-toastify'
import { Icon } from '@iconify/react/dist/iconify.js'

const Productos = () => {
  const {register, handleSubmit, formState: {errors}, setValue, watch, trigger } = useForm()
  //!-------------------------
  const {DatosPlatillo, NuevoPlatillo, SubirImagen, DatosPlatilloActualizar, listPlatillo, categorias, presentaciones, tamaños, platillos, guarniciones} = useAdmin()
  //*-------------------------
  const [isOpen, setIsOpen] =useState(false)
  const [opcionCategoria, setOpcionCategoria] = useState("")
  const [combinaciones, setCombinaciones] = useState([]);
  const [selectExtras, setSelectExtras] = useState([]);
  const [selectGuarniciones, setSelectGuarniciones] = useState([]);
  const [nuevaCombinacion, setNuevaCombinacion] = useState({ tamaño: "", presentacion: "", valor: "" });
  const [imagen, setImagen] = useState(null);
  const [nombreArchivo, setNombreArchivo] = useState("");
  
  
  const handleOpcionCategoria = (value) =>{
    setOpcionCategoria(value)
  }
  
  const handlePlatillosExtras = (value) => {
    setSelectExtras(value);
  }
  
  const handlePlatillosGuarniciones = (value) => {
    setSelectGuarniciones(value);
  }
  
  
  const handleOpcionTamanos = (value) => {
    setNuevaCombinacion({ ...nuevaCombinacion, tamaño: value });
  }

  const handleOpcionPresentacion = (value) => {
    setNuevaCombinacion({ ...nuevaCombinacion, presentacion: value });
  }

  const handleInputChange = (event) => {
    setNuevaCombinacion({ ...nuevaCombinacion, valor: event.target.value });
  }

  const handleEliminarCombinacion = (index) => {
    const nuevasCombinaciones = combinaciones.filter((_, idx) => idx !== index);
    setCombinaciones(nuevasCombinaciones);
  };

  const handleAgregarCombinacion = (e) => {
    e.preventDefault()
    if (!nuevaCombinacion.tamaño || !nuevaCombinacion.presentacion || nuevaCombinacion.valor === "") {
      toast.warning("Por favor completa todos los campos");
      return;
    } 
    
    const combinacionExistente = combinaciones.find(
      (combinacion) =>
        combinacion.tamaño.value === nuevaCombinacion.tamaño.value &&
        combinacion.presentacion.value === nuevaCombinacion.presentacion.value
    );
    if (combinacionExistente) {
      toast.warning("La combinación ya existe");
      return;
    }
    
    setCombinaciones([...combinaciones, nuevaCombinacion]);
    setNuevaCombinacion({ tamaño: "", presentacion: "", valor: "" });
  };

  const handleGuardarCombinaciones = (e) => {
    e.preventDefault();
  
    // Verificar si hay alguna combinación guardada
    const combinacionesGuardadas = combinaciones.length > 0;
  
    // Verificar si la combinación actual está completa
    const combinacionActualCompleta =
      nuevaCombinacion.tamaño &&
      nuevaCombinacion.presentacion &&
      nuevaCombinacion.valor !== "";
  
    if (!combinacionesGuardadas && !combinacionActualCompleta) {
      toast.warning("No hay combinaciones para guardar");
      return;
    }
  
    // Si hay combinaciones guardadas, guardarlas
    if (combinacionesGuardadas) {
      console.log("Combinaciones guardadas:", combinaciones);
    }
  
    // Si la combinación actual está completa, agregarla y mostrar un mensaje
    if (combinacionActualCompleta) {
      setCombinaciones([...combinaciones, nuevaCombinacion]);
      setNuevaCombinacion({ tamaño: "", presentacion: "", valor: "" });
      toast.success("Combinación guardada");
    }
  };
  
  
  const handleImagenChange = (event) => {
    const file = event.target.files[0];
    validarImagen(file);
  }
  
  //* Aqui editare 
  const [modalOpen, setModalOpen] = useState(false);
  
  const handleEditButtonClick = async(id) =>{
    try {
      await DatosPlatilloActualizar(id)
      setModalOpen(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleImagenDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    validarImagen(file);
  }
  
  const transformedData = listPlatillo[0] ? listPlatillo[0].map((item) => ({
    nombre_categoria: item.nombre_categoria,
    imagen: item.imagen,
    nombre_platillo: item.nombre_platillo,
    precio_mas_chico: item.precio_mas_chico,
    cantidad_repeticiones: item.cantidad_repeticiones,
    editar_eliminar: item.id_relacion,
  })) : [];
  
  
  const validarImagen = (file) => {
    const maxFileSize = 512000; // Tamaño máximo de archivo en bytes (0.5 MB)
    if (file && file.size > maxFileSize) {
      toast.warning(
        "El tamaño de la imagen es demasiado grande. Por favor, selecciona una imagen menor a 5 MB"
      );
      event.target.value = null; // Limpiar el input file
      return;
    }
    setImagen(file);
    setNombreArchivo(file.name); // Guardar el nombre del archivo válido
  };
  
  
  const columns = React.useMemo(
    () => [
      {
        Header: "Categoria",
        accessor: "nombre_categoria",
        className: "text-center",
      },
      {
        Header: "Imagen",
        accessor: "imagen",
        Cell: ({ value }) => (
          <img
            src={`https://labarbada.store/imagenes/${value}`}
            alt="Platillo"
            className="h-16 mx-auto"
          />
        ),
      },
      {
        Header: "Nombre del Producto",
        accessor: "nombre_platillo",
        Cell: ({ value }) => <div className="text-left">{value}</div>,
        width: 400,
      },
  
      { Header: "Precio Base", accessor: "precio_mas_chico", className: "text-center" },
      {
        Header: "Variantes",
        accessor: "cantidad_repeticiones",
      },
      {
        Header: "Editar/eliminar",
        accessor: "editar_eliminar",
        Cell: ({ row }) => (
          <div className="flex justify-center">
            <button onClick={() => handleEditButtonClick(row.original.editar_eliminar)}>
              <Icon icon="fe:edit" className="text-3xl mr-10" />{" "}
            </button>
            <button className="bg-red-600 p-2 rounded-md">
              <Icon icon="fa-regular:trash-alt" className="text-2xl" />
            </button>
          </div>
        ),
        className: "text-center",
      }
    ],
    []
  );
  
  const onSumit = handleSubmit(async (values) => {
    try {
      if (!opcionCategoria) {
        toast.warning("Por favor, selecciona una categoría")
        return
      }
      if(!imagen){
        toast.warning('Por favor, agrega una imagen')
        return
      }
      if (combinaciones.length === 0) {
        toast.warning("Por favor, añade al menos una combinación")
        return
      }
      if (selectGuarniciones.length === 0) {
        toast.warning("Por favor, selecciona al menos una guarnición")
        return
      }
      if (selectExtras.length === 0) {
        toast.warning("Por favor, selecciona al menos un platillo extra")
        return
      }
      
      await NuevoPlatillo(values.nombrePlatillo, values.descripcion, opcionCategoria.value, nombreArchivo, combinaciones, selectExtras, selectGuarniciones)
      
      await SubirImagen(imagen)
      
      setIsOpen(false)
    } catch (error) {
      console.log(error)
    }
  })

  const onUpdate = handleSubmit(async (values) => {
    try {
      
    } catch (error) {
      
    }
  })
  
  return (
    <>
    <div>
      <h1 className="text-white font-bold text-4xl text-center p-6 bg-red-600">
        Platillos
        <span className="text-sm font-light flex justify-center">
          Crea o edita productos
        </span>
      </h1>

      <div className="flex items-center justify-center space-x-4 p-6">
        <InputSearch
          textColor="text-black"
          iconColor="text-gray-500"
          placeholderColor="text-black"
          bgColor="bg-white"
          placeholderText="Nombre el producto"
          width="w-1/3"
        />

        <ButtonBasic
          text="Nuevo producto"
          width="w-auto p-2 "
          icon={"el:plus-sign"}
          click={(hand) => {
            DatosPlatillo(), setIsOpen(true);
          }}
        />
      </div>
      {isOpen && (
          <Modal title='Nuevo Platillo'>
            <div>
            <form onSubmit={onSumit} className="flex flex-col items-center">
              <div className="flex w-full space-x-6">
                <div className="w-1/2">
                  <div className="space-y-4">
                    <InputDesign title="Nombre Platillo"name="nombrePlatillo" method={register} err={errors} look={watch}
                    />
                    <InputTextArea title='Descripción' name='descripcion' method={register} err={errors} look={watch} />
                    <CustomSelect
                      options={categorias.map((categoria) => ({
                        value: categoria.id_categoria,
                        label: categoria.nombreCategoria,
                      }))}
                      placeholder={opcionCategoria ? opcionCategoria : "Categoría"}
                      onChange={handleOpcionCategoria}
                      value={opcionCategoria}
                    />
                    <div
                      onDrop={handleImagenDrop}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <input
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleImagenChange}
                        className="block w-full border border-black rounded-lg text-sm file:bg-gray-300 file:border-0 file:me-4 text-black file:py-3 file:px-4 "
                      />
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="space-x-6">
                    <div className="grid grid-cols-1 gap-4 text-black">
                      <div className="flex space-x-6 ">
                        <ButtonBasic
                          click={handleAgregarCombinacion}
                          text="Añadir variante"
                        />
                        <ButtonBasic
                          click={handleGuardarCombinaciones}
                          text="Guardar"
                          color="bg-green-600"
                          hovColor="bg-green-400"
                        />
                      </div>

                      <div className=" flex items-center">
                        <div className="flex-1 mr-2">
                          <CustomSelect
                            options={tamaños.map((tam) => ({
                              value: tam.id_tamaño,
                              label: tam.tamaño,
                            }))}
                            placeholder={
                              nuevaCombinacion.tamaño
                                ? nuevaCombinacion.tamaño.label
                                : "Tamaño"
                            }
                            onChange={handleOpcionTamanos}
                            value={nuevaCombinacion.tamaño}
                          />
                        </div>

                        <div className="flex-1 mr-2">
                          <CustomSelect
                            options={presentaciones.map((pre) => ({
                              value: pre.id_presentacion,
                              label: pre.nombrePresentacion,
                            }))}
                            placeholder={
                              nuevaCombinacion.presentacion
                                ? nuevaCombinacion.presentacion.label
                                : "Presentación"
                            }
                            onChange={handleOpcionPresentacion}
                            value={nuevaCombinacion.presentacion}
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            className="text-black border border-black p-2 rounded-lg w-full"
                            type="text"
                            value={nuevaCombinacion.valor}
                            onChange={handleInputChange}
                            placeholder="Ingrese el precio"
                          />
                        </div>
                      </div>
                      <div className="overflow-y-auto max-h-72 overflow-x-hidden">
                        {combinaciones.map((combinacion, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between mb-2 mr-1"
                          >
                            <span className="mr-2 ">
                              Combinación {index + 1}: {combinacion.tamaño.label},{" "}
                              {combinacion.presentacion.label}, {combinacion.valor}
                            </span>
                            <ButtonBasic
                              width={"w-auto p-2  "}
                              click={() => handleEliminarCombinacion(index)}
                              text={"Eliminar "}
                              color="bg-red-600"
                              hovColor="hover:bg-red-700"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-6 w-full ">
                        <CustomSelectPlus
                          options={platillos.map((item) => ({
                            value: item.id_relacion,
                            label: item.nombre_platillo,
                            precio: item.precio,
                            extraText: `Precio: ${item.precio}, Tamaño: ${item.tamaño}`,
                          }))}
                          placeholder="Seleccione una opcion"
                          onChange={handlePlatillosExtras}
                          value={selectExtras}
                        />
                        <CustomSelectPlus
                          options={guarniciones.map((item) => ({
                            value: item.id_relacion,
                            label: item.nombre_platillo,
                            precio: item.precio,
                            extraText: `Precio: ${item.precio}, Tamaño: ${item.tamaño}`,
                          }))}
                          placeholder="Seleccione una opcion"
                          onChange={handlePlatillosGuarniciones}
                          value={selectGuarniciones}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-6 w-full p-4 ">
                <ButtonBasic text="Añadir producto" click={handleSubmit} />
                <ButtonBasic text="cancelar"color="bg-red-600"hovColor="bg-red-600"click={() => setIsOpen(false)}
                />
              </div>
            </form>
            </div>
          </Modal>
      )}
      {modalOpen && (
        <Modal title='Editar platillo'>
          <div>
            <form onSubmit={onUpdate} className="flex flex-col items-center">
            <div className="flex w-full space-x-6">
                <div className="w-1/2">
                  <div className="space-y-4">
                    <InputDesign title="Nombre Platillo"name="newNombrePlatillo" method={register} err={errors} look={watch}
                    />
                    <InputTextArea title='Descripción' name='newDescripcion' method={register} err={errors} look={watch} />
                    <h3>{}</h3>
                    <div
                      onDrop={handleImagenDrop}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <input
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleImagenChange}
                        className="block w-full border border-black rounded-lg text-sm file:bg-gray-300 file:border-0 file:me-4 text-black file:py-3 file:px-4 "
                      />
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="space-x-6">
                    <div className="grid grid-cols-1 gap-4 text-black">
                      {/* <div className="flex space-x-6 ">
                        <ButtonBasic
                          click={handleAgregarCombinacion}
                          text="Añadir variante"
                        />
                        <ButtonBasic
                          click={handleGuardarCombinaciones}
                          text="Guardar"
                          color="bg-green-600"
                          hovColor="bg-green-400"
                        />
                      </div> */}
                      {/* <div className=" flex items-center">
                        <div className="flex-1 mr-2">
                          <CustomSelect
                            options={tamaños.map((tam) => ({
                              value: tam.id_tamaño,
                              label: tam.tamaño,
                            }))}
                            placeholder={
                              nuevaCombinacion.tamaño
                                ? nuevaCombinacion.tamaño.label
                                : "Tamaño"
                            }
                            onChange={handleOpcionTamanos}
                            value={nuevaCombinacion.tamaño}
                          />
                        </div>
                        <div className="flex-1 mr-2">
                          <CustomSelect
                            options={presentaciones.map((pre) => ({
                              value: pre.id_presentacion,
                              label: pre.nombrePresentacion,
                            }))}
                            placeholder={
                              nuevaCombinacion.presentacion
                                ? nuevaCombinacion.presentacion.label
                                : "Presentación"
                            }
                            onChange={handleOpcionPresentacion}
                            value={nuevaCombinacion.presentacion}
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            className="text-black border border-black p-2 rounded-lg w-full"
                            type="text"
                            value={nuevaCombinacion.valor}
                            onChange={handleInputChange}
                            placeholder="Ingrese el precio"
                          />
                        </div>
                      </div> */}
                      {/* <div className="overflow-y-auto max-h-72 overflow-x-hidden">
                        {combinaciones.map((combinacion, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between mb-2 mr-1"
                          >
                            <span className="mr-2 ">
                              Combinación {index + 1}: {combinacion.tamaño.label},{" "}
                              {combinacion.presentacion.label}, {combinacion.valor}
                            </span>
                            <ButtonBasic
                              width={"w-auto p-2  "}
                              click={() => handleEliminarCombinacion(index)}
                              text={"Eliminar "}
                              color="bg-red-600"
                              hovColor="hover:bg-red-700"
                            />
                          </div>
                        ))}
                      </div> */}
                      {/* <div className="flex space-x-6 w-full ">
                        <CustomSelectPlus
                          options={platillos.map((item) => ({
                            value: item.id_relacion,
                            label: item.nombre_platillo,
                            precio: item.precio,
                            extraText: `Precio: ${item.precio}, Tamaño: ${item.tamaño}`,
                          }))}
                          placeholder="Seleccione una opcion"
                          onChange={handlePlatillosExtras}
                          value={selectExtras}
                        />
                        <CustomSelectPlus
                          options={guarniciones.map((item) => ({
                            value: item.id_relacion,
                            label: item.nombre_platillo,
                            precio: item.precio,
                            extraText: `Precio: ${item.precio}, Tamaño: ${item.tamaño}`,
                          }))}
                          placeholder="Seleccione una opcion"
                          onChange={handlePlatillosGuarniciones}
                          value={selectGuarniciones}
                        />
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-6 w-full p-4 ">
                <ButtonBasic text="Añadir producto" click={handleSubmit} />
                <ButtonBasic text="cancelar"color="bg-red-600"hovColor="bg-red-600"click={() => setModalOpen(false)}
                />
              </div>
            </form>
          </div>
        </Modal>)
      }
        <TablaComponentes columns={columns} data={transformedData} />
      </div>
    </>
  )
}

export default Productos