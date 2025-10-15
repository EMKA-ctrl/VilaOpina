
import './App.css'
import { useState } from 'react';
import {type Proposta,getCollectionData,addDocument,addFieldToDocument,deleteFieldFromDocument,deleteDocument,updateDocument,deleteCollection} from "./firebase";


function App() {
  const [listProps, setListProps] = useState<Proposta[]>([]);

  async function llistaProps() {
    const response = await getCollectionData("Propostes") as Proposta[];

    // Ordenamos de mayor a menor según 'vots'
    response.sort((a, b) => b.vots - a.vots);

    setListProps(response);
  }

  return (
    <div className="app-container">
      <main className="maindiv">
        <p>Propostes Destacades</p>

        <button onClick={llistaProps}>Refresh</button>

        {listProps.map((prop) => (
          <div key={prop.id} className='TarjaProp'>
            <h3>{prop.Text}</h3>
            <p>Vots: {prop.vots}</p>
          </div>
        ))}
      </main>

      <footer className="footer-div">
        <div className="footer-subdiv">menu1</div>
        <div className="footer-subdiv">menu2</div>
        <div className="footer-subdiv">menu3</div>
      </footer>
    </div>
  );
}

export default App;
