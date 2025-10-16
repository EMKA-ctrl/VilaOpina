
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import Home from './Home'
import MyPropostes from './MyPropostes';

import logoHome from './assets/home.png'
import logoAdd from './assets/add.png'


function App() {
  

  return (
    <Router>
      <div className="app-container">
        
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/my_propostes" element={<MyPropostes/>} />
          </Routes>


        <footer className="footer-div">
          <Link className="footer-subdiv_l" to="/"><img className='footerLogo' src={logoHome}></img></Link>
          <Link className="footer-subdiv_r" to="/my_propostes"><img src={logoAdd}></img></Link>
        </footer>
      </div>
    </Router>
  );
}

export default App;

