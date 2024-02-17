import "./App.css";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Vigenere from "./ciphers/Vigenere";
import Playfair from "./ciphers/Playfair";
import Affine from "./ciphers/Affine";
import Hill from "./ciphers/Hill";
import Superencrypt from "./ciphers/Superencrypt";
import Enigma from "./ciphers/Enigma";

function App() {
  return (
    <div className="flex w-screen">
      <Sidebar></Sidebar>
      <div className="w-full p-4 flex flex-col justify-center bg-background">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="vigenere" element={<Vigenere />}></Route>
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
