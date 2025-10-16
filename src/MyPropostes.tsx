import './MyPropostes.css'
import { useState } from 'react';
import {addDocument,type Proposta,getCollectionData} from "./firebase";


function MyPropostes() {
    const [proposta, setProposta] = useState("");
    const [listProps, setListProps] = useState<Proposta[]>([]);

    const handleChange = (e:any) => {
      setProposta(e.target.value);
    };

    const handleSubmit = () => {
      console.log("Proposta escrita:", proposta);
      // Aquí podrías llamar a addDocument() o lo que necesites
      addDocument(proposta,{})
      addDocument("Propostes",{Text:proposta,no:0,si:0,vots:0})
    };

        async function llistaProps() {
            const response = await getCollectionData("Propostes") as Proposta[];
    
            // Ordenamos de mayor a menor según 'vots'
            response.sort((a, b) => b.vots - a.vots);
    
            setListProps(response);
        }
    
    return(

        <div className="maindiv">
          <div className='HomeTitle'>
            <h2>Contribucions</h2>
          </div>
          <input name='campProposta' value={proposta} onChange={handleChange} placeholder="Escriu una proposta"></input>
          <button onClick={handleSubmit}>Enviar</button>

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
export default MyPropostes;