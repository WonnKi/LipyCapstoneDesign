import './App.css';

import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Home from "./screens/Home";
import Bookcase from "./screens/Bookcase";
import Community from "./screens/Community";
import Socialing from "./screens/Socialing";
import NevBar from "./components/NevBar";
import FirstBookCase from "./screens/firstBookCase";
import SecondBookCase from "./screens/secondBookCase";
import ThirdBookCase from "./screens/thirdBookCase";


function App() {
  return (
      <BrowserRouter>
        <NevBar/>
        <Routes>
            <Route path = "/" element={ <Home /> } />
            <Route path = "/Bookcase" element={ <Bookcase /> } />
            <Route path = "/Community" element={ <Community /> } />
            <Route path = "/Socialing" element={ <Socialing /> } />
            <Route path = "/FirstBookCase" element={ <FirstBookCase /> } />
            <Route path = "/SecondBookCase" element={ <SecondBookCase /> } />
            <Route path = "/ThirdBookCase" element={ <ThirdBookCase /> } />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
