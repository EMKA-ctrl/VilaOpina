/*import './Home.css'
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
          <div className='HomeTitle'>
            <h2>Destacades</h2>
          </div>

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

*/
import './Home.css';
import { useState, useEffect, useRef } from 'react';
import { type Proposta } from "./firebase";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter
} from "firebase/firestore";


const db = getFirestore();

function Home() {
  const [listProps, setListProps] = useState<Proposta[]>([]);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Ref para guardar scroll anterior
  const prevScrollY = useRef(0);

  // Set para ids ya cargados
  const loadedIds = useRef<Set<string>>(new Set());

  // 🔹 Carga de propuestas con paginación y filtro anti-duplicados
  async function llistaProps() {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const pageSize = 5;
      let q;

      if (lastDoc) {
        q = query(
          collection(db, "Propostes"),
          orderBy("vots", "desc"),
          startAfter(lastDoc),
          limit(pageSize)
        );
      } else {
        q = query(
          collection(db, "Propostes"),
          orderBy("vots", "desc"),
          limit(pageSize)
        );
      }

      const snapshot = await getDocs(q);
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Proposta[];

      // 🔹 Filtrar duplicados usando Set de ids
      const filtered = newData.filter(item => !loadedIds.current.has(item.id));

      if (filtered.length === 0) {
        setHasMore(false); // ya no hay nuevas propuestas
      } else {
        // Añadir nuevas propuestas a la lista
        setListProps((prev) => [...prev, ...filtered]);

        // Añadir ids al Set
        filtered.forEach(item => loadedIds.current.add(item.id));

        // Actualizar lastDoc solo si hay nuevos datos
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      }

    } catch (err) {
      console.error("❌ Error obtenint propostes:", err);
    } finally {
      setLoading(false);
    }
  }

  // Cargar primera tanda al entrar
  useEffect(() => {
    llistaProps();
  }, []);

  // Scroll listener solo hacia abajo
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Solo cuando hacemos scroll hacia abajo
      if (currentScrollY > prevScrollY.current) {
        const bottom =
          window.innerHeight + currentScrollY >= document.body.offsetHeight - 100;

        if (bottom && !loading && hasMore) {
          console.log("➡️ Scroll hacia abajo al final → cargando más propuestas...");
          llistaProps();
        }
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, lastDoc, listProps]);

  return (
    <div className="maindiv">
      <div className='HomeTitle'>
        <h2>Destacades</h2>
      </div>
      

      {listProps.map((prop) => (
        <div key={prop.id} className='TarjaProp'>
          <h4>{prop.Text}</h4>
          
          <p>Vots: {prop.vots}</p>
          <p>a favor: {prop.si}</p>
          <p>en contra: {prop.no}</p>
        </div>
      ))}

      {loading && <p>Carregant més...</p>}
      {!hasMore && <p>No hi ha noves propostes 😄</p>}
      
    </div>
  );
}

export default Home;

