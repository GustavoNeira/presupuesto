import {useState} from 'react'
import Mensaje from './Mensaje'
const NuevoPresupuesto = ({presupuesto, setPresupuesto,setPresupuestoValido}) => {

  const [mensaje, setMensaje] = useState('')

  const handlePresupuesto = (e) => {
    e.preventDefault();
    if(!presupuesto || presupuesto < 0 ){
      setMensaje('no es un presupuesto valido')

      return
    }
    setMensaje('')
    setPresupuestoValido(true)
    

  }
  return (
    <div className='contenedor-presupuesto contenedor sombra'>
     <form className='formulario' onSubmit={handlePresupuesto}>
      <div className='campo'>
        <label>Definir Presupuesto</label>
        <input
        className='nuevo-presupuesto'
        type='number'
        placeholder='Ingresa tu presupuesto'
        value={presupuesto}
        onChange={ e => setPresupuesto(e.target.value)}
        />
        
      </div>
      <input
      type='submit' value='Añadir'
      />
      {mensaje && <Mensaje tipo={"error"}>{mensaje}</Mensaje>}
     </form>
      </div>
  )
}

export default NuevoPresupuesto