import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Menu from './componentes/Menu'
import Home from './componentes/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react';
import Racas from './componentes/telas/racas/racas';
import Caes from './componentes/telas/caes/Caes';

function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/racas" element={<Racas />} />
        <Route exact path="/caes" element={<Caes />} />
      </Routes>
    </Router>
  );
}

export default App;

