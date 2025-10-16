// firebase.tsx
// usage:
/*
<button onClick={()=>{console.log(getCollectionData("Prop1"))}}>Consulta Proposta</button>
      <button onClick={()=>{console.log(addDocument("Prop1",{"answer": false},"Dni5443214532"))}}>Afegeix Vot a proposta</button>
      <button onClick={()=>{console.log(addDocument("Prop2",{}))}}>Afegeix Proposta</button>
      <button onClick={()=>{console.log(deleteCollection("45883264"))}}>Eliminar Proposta</button>
*/




import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  deleteField,
  deleteDoc,
} from "firebase/firestore";

// 🔧 Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCaCJRgDcxUN7rEDwESwk8ByECuD0JzeC0",
  authDomain: "autoads-1006a.firebaseapp.com",
  projectId: "autoads-1006a",
  storageBucket: "autoads-1006a.firebasestorage.app",
  messagingSenderId: "825520274800",
  appId: "1:825520274800:web:8bd708eb0def9786b863b5",
  measurementId: "G-34PNX93MV6",
};

// 🧱 Inicialización segura (evita inicializar Firebase más de una vez)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

//
// 🔍 FUNCIONES CRUD BÁSICAS
//



/**
 * 🔹 Obtener todos los documentos de una colección específica
 */

export type Proposta = {
  id: string;
  vots: number;
  si: number;
  no: number;
  Text: string;
};

export async function getCollectionData(collectionName: string) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Proposta, 'id'>),
  }));
}

/**
 * 🔹 Agregar un documento a una colección (la crea si no existe)
 */
export async function addDocument(collectionName: string, data: object,docId?: string) {
  
  try{
      if (docId) {
      const docRef = doc(db, collectionName, docId);
      await setDoc(docRef, data);
      return { id: docId, ...data };
    } else {
      const docRef = await addDoc(collection(db, collectionName), data);
      return { id: docRef.id, ...data };
    }
  }
  catch (error) {
    console.error(`Error adding document to "${collectionName}":`, error);
    throw error; // let the caller handle it
  }
  
  


}

/**
 * 🔹 Agregar o actualizar un campo en un documento
 */
export async function addFieldToDocument(
  collectionName: string,
  docId: string,
  field: string,
  value: any
) {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, { [field]: value });
  return { success: true };
}

/**
 * 🔹 Eliminar un campo de un documento
 */
export async function deleteFieldFromDocument(
  collectionName: string,
  docId: string,
  field: string
) {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, { [field]: deleteField() });
  return { success: true };
}

/**
 * 🔹 Eliminar un documento completo
 */
export async function deleteDocument(collectionName: string, docId: string) {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
  return { success: true };
}

/**
 * 🔹 Actualizar múltiples campos de un documento
 */
export async function updateDocument(
  collectionName: string,
  docId: string,
  data: object
) {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, data);
  return { id: docId, ...data };
}

export async function deleteCollection(collectionName: string) {
  const querySnapshot = await getDocs(collection(db, collectionName));

  const deletePromises = querySnapshot.docs.map((d) => deleteDoc(doc(db, collectionName, d.id)));
  await Promise.all(deletePromises);

  return { success: true, deleted: querySnapshot.docs.length };
}
