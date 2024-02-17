import "./App.css";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Viginere from "./components/Viginere";
import Playfair from "./components/Playfair";
import Affine from "./components/Affine";
import Hill from "./components/Hill";
import Superencrypt from "./components/Superencrypt";
import Enigma from "./components/Enigma";

function App() {
  return (
    <div className="flex w-screen">
      <Sidebar></Sidebar>
      <div className="w-full p-4 flex flex-col justify-center bg-background">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="viginere" element={<Viginere />}></Route>
          <Route path="playfair" element={<Playfair />}></Route>
          <Route path="affine" element={<Affine />}></Route>
          <Route path="hill" element={<Hill />}></Route>
          <Route path="superencrypt" element={<Superencrypt />}></Route>
          <Route path="enigma" element={<Enigma />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
