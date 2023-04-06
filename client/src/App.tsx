import "./App.css";
import { useState, useEffect, useMemo, Dispatch, SetStateAction} from "react";
import Navbar from "./components/NavigationBar/Navbar";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import FindServices from "./components/FindServices/FindServices";
import Help from "./components/Account/Account";
import PetSitter from "./components/PetSitter/PetSitter";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { userContext, IUser, IUserDetails } from "./UserContext";

const initial = {
  username: " ",
  email: " ",
}

function App() {
  const [user, setUser] = useState(initial)
  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])
  // Store user data in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])
  const ProviderValue = useMemo(() => ({user, setUser}), [user, setUser])
    return (
    <userContext.Provider value={ProviderValue}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="find-services" element={<FindServices />} />
      <Route path="pet-sitters" element={<PetSitter />} />
      <Route path="account" element={<Help />} />
      <Route path="login" element={<Login />} />
      <Route path="sign-up" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </userContext.Provider>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}