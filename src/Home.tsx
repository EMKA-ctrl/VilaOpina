import './Home.css'
import { useState } from 'react';
import {type Proposta,getCollectionData} from "./firebase";


function Home() {
    const [listProps, setListProps] = useState<Proposta[]>([]);

    async function llistaProps() {
        const response = await getCollectionData("Propostes") as Proposta[];

        // Ordenamos de mayor a menor según 'vots'
        response.sort((a, b) => b.vots - a.vots);

        setListProps(response);
    }
    return(

        <div className="maindiv">
          <p>Propostes Destacades</p>

          <button onClick={llistaProps}>Refresh</button>

          {listProps.map((prop) => (
            <div key={prop.id} className='TarjaProp'>
              <h3>{prop.Text}</h3>
              <p>Vots: {prop.vots}</p>
              <p>a favor: {prop.si}</p>
               <p>en contra: {prop.no}</p>
            </div>
          ))}
        </div>
    )
}
export default Home;