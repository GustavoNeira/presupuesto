import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import Controlpresupuesto from './Controlpresupuesto'

const Header = ({
   gastos,
   presupuesto,
   setPresupuesto,
   presupuestoValido,
   setPresupuestoValido,
   setGastos,
  }) => {
  return (
    <header>
      <h1>Planificardor de Gastos</h1>
      {presupuestoValido ? (
      <Controlpresupuesto
      gastos={gastos}
      presupuesto={presupuesto}
      setGastos={setGastos}
      setPresupuesto={setPresupuesto}
      setPresupuestoValido={setPresupuestoValido}
      />):
      (
        <NuevoPresupuesto
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        setPresupuestoValido = {setPresupuestoValido}
        />

      )}
     
    </header>
  )
}

export default Header