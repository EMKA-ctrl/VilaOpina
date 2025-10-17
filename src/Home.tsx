import './Home.css'
import { useState,useEffect } from 'react';
import {type Proposta,getCollectionData} from "./firebase";
import logoRefresh from './assets/refreshicon.png'
import SemiDonut from './halfDonut'


function Home() {
    const [listProps, setListProps] = useState<Proposta[]>([]);

    async function llistaProps() {
        const response = await getCollectionData("Propostes") as Proposta[];

        // Ordenamos de mayor a menor según 'vots'
        response.sort((a, b) => b.vots - a.vots);

        setListProps(response);
    }

    useEffect(() => {llistaProps();}, []);

    return(
        
        <div className="maindiv">
          <div className='HomeTitle'>
            <h2>Destacades</h2>
            <div className='refresh' onClick={llistaProps}>
              <img  src={logoRefresh}></img>
            </div>
          </div>
          
          

          {listProps.map((prop) => (
            <div key={prop.id} className='TarjaProp'>
              <h3>{prop.Text}</h3>
              <div className='graph'><SemiDonut  siPercentage={prop.si}  ></SemiDonut></div>
              <div className='infoVots'>
                <p>Vots : {prop.vots}</p>
                <p>Si: {prop.si}</p>
                <p>No: {prop.no}</p>
               </div>
            </div>
          ))}
        </div>
    )
}
export default Home;
