import './App.css';

import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Home from "./screens/Home";
import Bookcase from "./screens/Bookcase";
import Community from "./screens/Community";
import Socialing from "./screens/Socialing";
import Offcanvas from "./components/Offcanvas";
import NevBar from "./components/NevBar";


function App() {
  return (
      <BrowserRouter>
        <NevBar/>
        <Routes>
            <Route path = "/" element={ <Home /> } />
            <Route path = "/Bookcase" element={ <Bookcase /> } />
            <Route path = "/Community" element={ <Community /> } />
            <Route path = "/Socialing" element={ <Socialing /> } />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
