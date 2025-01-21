import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Escritorio from "./pages/Escritorio";
import RH from "./pages/RH";
import Comercial from "./pages/Comercial";

const App = () => {
  return (
    <Router classname = "bg-color-blue500">
      <Header />
      <Routes>
        <Route path="/" element={<Escritorio />} />
        <Route path="/rh" element={<RH />} />
        <Route path="/comercial" element={<Comercial />} />
      </Routes>
    </Router>
  );
};

export default App;
