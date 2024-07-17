import { useState, useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Filtros from './components/Filtros'
import Modal from './components/Modal'
import { generarId } from './helpers'
import IconNuevoGasto from './img/nuevo-gasto.svg'
import Gasto from './components/Gasto'

function App() {
const [gastos, setGastos] = useState(
  localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
)
const [presupuesto, setPresupuesto] = useState(

  Number(localStorage.getItem('presupuesto') ?? 0))

const [presupuestoValido, setPresupuestoValido] = useState(false)

const [modal,setmodal] = useState(false)
const [animarModal,setanimarModal] = useState(false)
const [gastoEditar, setGastoEditar] = useState({})
const [filtro,setFiltro] = useState('')
const [gastosFiltrados,setGastosFiltrados] = useState([])

useEffect(()=>{
  if(Object.keys(gastoEditar).length > 0 ){
    setmodal(true)


  setTimeout(()=>{
    setanimarModal(true)

  },500);
  }

},[gastoEditar])


useEffect(() => {
localStorage.setItem('presupuesto',presupuesto ?? 0)
},[presupuesto])

useEffect(()=>{
  if(filtro){
    const gastosFiltrados = gastos.filter( gasto => gasto.Categoria === filtro)
    setGastosFiltrados(gastosFiltrados)
  }

},[filtro])

useEffect(() => {
localStorage.setItem('gastos',JSON.stringify(gastos) ?? [])
},[gastos])

useEffect(()=>{
  const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
if(presupuestoLS > 0 ){
  setPresupuestoValido(true)
}

}, [])




const handleNuevoGasto = () => {
  setmodal(true)
  setGastoEditar({})

  setTimeout(()=>{
    setanimarModal(true)

  },500);

}

  const guardarGasto = gasto =>{

    if(gasto.id){
      //Actualza el registro 
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }
    else{
      //Nuevo Gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos,gasto])

    }
    

    setanimarModal(false)
    setTimeout(()=> {
      setmodal(false)
    },500)

    
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id)
    setGastos(gastosActualizados)

  }

  return (
  <div className={modal ? 'fijar' : ''}> 
    <Header
        setGastos={setGastos}
        gastos = {gastos}
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        presupuestoValido = {presupuestoValido}
        setPresupuestoValido = {setPresupuestoValido}
  />

  {presupuestoValido &&(
    <>
    <main>
      <Filtros 
      filtro={filtro}
      setFiltro={setFiltro}
      />
      <ListadoGastos
       gastos={gastos}
       setGastoEditar={setGastoEditar}
       eliminarGasto={eliminarGasto}
       filtro={filtro}
       gastosFiltrados={gastosFiltrados}
        />
      </main>
   <div className='nuevo-gasto'>
     <img
       src={IconNuevoGasto}
       alt='Icono Nuevo Gasto'
       onClick={handleNuevoGasto}
      />
   </div>
   </>
  ) }
  {modal &&
      <Modal
      setmodal = {setmodal}
      animarModal={animarModal}
      setanimarModal={setanimarModal}
      guardarGasto={guardarGasto}
      gastoEditar={gastoEditar}
      setGastoEditar={setGastoEditar}

   
      />}
   </div>
  )
}

export default App
