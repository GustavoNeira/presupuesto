import React from 'react'
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"
import { formatoFecha, formatoPresupuesto } from '../helpers'

import IconoAhorro from '../img/icono_ahorro.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'



const diccionarioIconos = {
  ahorro : IconoAhorro,
  comida : IconoComida,
  casa   : IconoCasa,
  ocio   : IconoOcio,
  salud  :IconoSalud,
  transporte : IconoGastos,
  suscripcion : IconoSuscripciones,

}

const Gasto = ({gasto, setGastoEditar,eliminarGasto}) => {
    const {nombreGasto,Cantidad,Categoria,id,fecha} = gasto;

    const leadingActions = () => (
      <LeadingActions>
        <SwipeAction onClick={()=> setGastoEditar(gasto)}>
          Editar

        </SwipeAction>
      </LeadingActions>
    )
    const trailingActions = () => (
      <TrailingActions>
        <SwipeAction onClick={()=> eliminarGasto(id)}>
          Eliminar
        </SwipeAction>
      </TrailingActions>
    )
  return (
    <SwipeableList>
      <SwipeableListItem 
      leadingActions = {leadingActions()}
      trailingActions = {trailingActions()}>
    <div className='gasto sombra'>
        <div className='contenido-gasto'>
          <img
              src={diccionarioIconos[Categoria]}
              alt='Icono Gasto'
           />
            <div className='descripcion-gasto'>
                <p className='categoria'> {Categoria}</p>
                <p className='nombre-gasto'> {nombreGasto}</p>
                <p className='fecha-gasto'>Agregado el: {''}<span>{formatoFecha(fecha)}</span></p>
                

            </div>
            

        </div>
        <p className='cantidad-gasto'>{formatoPresupuesto(Cantidad)}</p>
    </div>
    </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto