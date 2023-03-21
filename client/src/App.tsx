import "./App.css";
import Navbar from "./components/NavigationBar/Navbar";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import FindServices from "./components/FindServices/FindServices";
import Help from "./components/Help/Help";
import PetSitter from "./components/PetSitter/PetSitter";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

export interface RelationView {
  columns: Array<string>
  rows: Array<{ [key: string]: any }> // ? represents the string-key, arbitrary-value type, for example [{"id": 2, "name": "mehdi"}, {"id": 1, "name": "fuad"}]}
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="find-services" element={<FindServices />} />
      <Route path="pet-sitters" element={<PetSitter />} />
      <Route path="help" element={<Help />} />
      <Route path="login" element={<Login />} />
      <Route path="sign-up" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}