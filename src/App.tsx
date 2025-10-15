
import './App.css'
import {
  getCollectionData,
  addDocument,
  addFieldToDocument,
  deleteFieldFromDocument,
  deleteDocument,
  updateDocument,deleteCollection
} from "./firebase";


function App() {
  let va4r=5;

  
  void function getNumbersProposta(Proposta:string){
    let response = getCollectionData(Proposta);



  }
  return (
    <>
      <div>
      <button onClick={()=>{console.log(getCollectionData("Prop1"))}}>Consulta Proposta</button>
      <button onClick={()=>{console.log(addDocument("Prop1",{"answer": false},"Dni5443214532"))}}>Afegeix Vot a proposta</button>
      <button onClick={()=>{console.log(addDocument("Prop2",{}))}}>Afegeix Proposta</button>
      <button onClick={()=>{console.log(deleteCollection("45883264"))}}>Eliminar Proposta</button>

      <p>{va4r}</p>
      
      </div>

  
    </>
  )
}

export default App
