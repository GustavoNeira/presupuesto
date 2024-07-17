import {useState,useEffect} from 'react'
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Controlpresupuesto = ({gastos,presupuesto,setPresupuesto,setGastos,setPresupuestoValido}) => {

    const [porcentaje,setPorcentaje] = useState(0)

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.Cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado;

        //calcular el porsentaje gastado

        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2);
        
        setDisponible(totalDisponible)
        setGastado(totalGastado)

        setTimeout(() => {
        setPorcentaje(nuevoPorcentaje)
        
       }, 1500);
      }, [gastos]);

    const formatoPresupuesto = (cantidad) => {
        return new Intl.NumberFormat('es-CL', {
          style: 'currency',
          currency: 'CLP'
        }).format(cantidad);
      }

      const handleRestApp = ()=>{
        const reiniciar = confirm('¿Deseas reiniciar Presupuesto y Gastos?') 

        if(reiniciar){
            setGastos([])
            setPresupuesto(0)
            setPresupuestoValido(false)

        }
        else{

        }
      }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar 
             styles={buildStyles({
                pathColor : porcentaje > 100 ? '#DC2626' : '#3B82F6',
                trailColor : '#F5F5F5',
                textColor : porcentaje > 100 ? '#DC2626' : '#000',
                

             })}
             value={porcentaje}
             text={`${porcentaje}% Gastado`}
             
            />
        </div>
        <div className='contenido-presupuesto'>
            <button className='reset-app' type='button' onClick={handleRestApp}>
                Reiniciar App
            </button>
            <p>
                <span>Presupuesto: </span>{formatoPresupuesto(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span>{formatoPresupuesto(disponible)}
            </p>
            <p>
                <span>Gastado: </span>{formatoPresupuesto(gastado)}
            </p>
        </div>
    </div>
  )
}

export default Controlpresupuesto