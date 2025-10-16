
import { useState } from 'react';
import {addDocument} from "./firebase";


function MyPropostes() {
    const [proposta, setProposta] = useState("");

    const handleChange = (e:any) => {
      setProposta(e.target.value);
    };

    const handleSubmit = () => {
      console.log("Proposta escrita:", proposta);
      // Aquí podrías llamar a addDocument() o lo que necesites
      addDocument(proposta,{})
      addDocument("Propostes",{Text:proposta,no:0,si:0,vots:0})
    };
    
    return(

        <div className="maindiv">
          <p>Crear Proposta</p>
          <input name='campProposta' value={proposta} onChange={handleChange} placeholder="Escriu una proposta"></input>
          <button onClick={handleSubmit}>Enviar</button>

        </div>
    )
}
export default MyPropostes;