import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ModulePage from "./pages/ModulePage";
import Certificate from "./pages/Certificate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        { }
        <Route path="/module/:id" element={<ModulePage />} />

        <Route path="/certificate" element={<Certificate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;