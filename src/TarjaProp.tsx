import {type Proposta,} from "./firebase";
import SemiDonut from './halfDonut';
import './TarjaProp.css'

interface TarjaPropProps {
  listObj: Proposta[]; // 👈 el prop se llama listObj y es un array
}

function TarjaProp ({listObj}:TarjaPropProps){
    

    return(
        <>
            {listObj.map((prop) => (
            <div key={prop.id} className='TarjaProp'>
              <h4>{prop.Text}</h4>
              <div className='graph'><SemiDonut  siPercentage={100*(prop.si/prop.vots)}  ></SemiDonut></div>
              <div className='infoVots'>
                <p>Vots : {prop.vots}</p>
                <p>Si: {prop.si}</p>
                <p>No: {prop.no}</p>
               </div>
            </div>
          ))}
        </>
    )
}
export default TarjaProp;