import './Home.css'
import { useState,useEffect } from 'react';
import {type Proposta,getCollectionData} from "./firebase";
import logoRefresh from './assets/refreshicon.png'
import TarjaProp from './TarjaProp';


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
            <h2>Destacades </h2>
            <div className='refresh' onClick={llistaProps}>
              <img  src={logoRefresh}></img>
            </div>
          </div>      
          <TarjaProp listObj={listProps}/>
        </div>
    )
}
export default Home;
