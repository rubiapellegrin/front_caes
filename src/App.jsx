import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import MenuPublico from './componentes/MenuPublico'
import MenuPrivado from './componentes/MenuPrivado'
import Home from './componentes/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react';
import Racas from './componentes/telas/racas/racas';
import Caes from './componentes/telas/caes/Caes';
import Login from './componentes/telas/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact="true" path="/" element={<MenuPublico />}  >
          <Route index element={<Home />} />
          <Route exact="true" path="/Login" element={<Login />} />
        </Route>

        <Route exact="true" path="/privado" element={<MenuPrivado />}  >
          <Route index element={<Home />} />
          <Route exact="true" path="racas" element={<Racas />} />
          <Route exact="true" path="caes" element={<Caes />} />
          <Route exact="true" path="Login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}


export default App;

