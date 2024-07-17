import {useState,useEffect} from 'react'
import Mensaje from './Mensaje'
import Ic_CerrarModal from '../img/cerrar.svg'


const Modal = ({setmodal,animarModal,setanimarModal,guardarGasto,gastoEditar,setGastoEditar}) => {

    const [mensaje, setMensaje] = useState('')

    const [nombreGasto,setnombreGasto] = useState('')
    const [Cantidad,setCantidad] = useState('')
    const [Categoria,setCategoria] = useState('')
    const [fecha,setFecha] = useState('')
    const [id, setId] = useState('')


    useEffect(()=>{
        if(Object.keys(gastoEditar).length > 0){
          setnombreGasto(gastoEditar.nombreGasto)
          setCantidad(gastoEditar.Cantidad)
          setCategoria(gastoEditar.Categoria)
          setFecha(gastoEditar.fecha)
          setId(gastoEditar.id)
        }
    },[])

    const CerrarModal = () => {
       
        setanimarModal(false)
        setGastoEditar({})

        setTimeout(() => {
            setmodal(false)
        }, 500);

     

    }
    const handleSubmit = e => {
        e.preventDefault();
        
        if([nombreGasto,Cantidad,Categoria].includes('')){
            setMensaje('Todos los Campos son Obligatorios')

            setTimeout(()=>{
                setMensaje('')
            },3000)
            return;
        }
        guardarGasto({nombreGasto,Cantidad,Categoria,id,fecha})
    }   
  return (

    <div className='modal'>
        <div className='cerrar-modal' onClick={CerrarModal}>
            <img 
            src={Ic_CerrarModal}
            alt='Cerrar Modal'
            
            
            />
        </div>
        <form onSubmit={handleSubmit} className={`formulario ${animarModal ? "animar" : 'cerrar'}`}>
            <legend>{gastoEditar.nombreGasto ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
            {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
            <div className='campo'>
                <label htmlFor='nombre'>Nombre Gasto</label>
                <input id='nombreGasto' type='text' placeholder='Ingresa el Nombre del Gasto' 
                value={nombreGasto} onChange={e => setnombreGasto(e.target.value) }/>
            </div>
            <div className='campo'>
                <label htmlFor='Cantidad'>Cantidad</label>
                <input id='Cantidad' type='number' placeholder='Ingresa la Cantidad del Gasto'
                 value={Cantidad} onChange={e => setCantidad(Number(e.target.value))}/>
            </div>
            <div className='campo'>
                <label htmlFor='Categoria'>Categoria</label>
                <select id='Categoria' value={Categoria} onChange={e => setCategoria(e.target.value) }>
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="transporte">Transporte</option>
                    <option value="suscripcion">suscripciones</option>

                </select>
                
            </div>
            <input type='submit' value={gastoEditar.nombreGasto ? 'Guardar Cambios' : 'Añadir Gasto'}/>
            
        </form>
    </div>
  )
}

export default Modal