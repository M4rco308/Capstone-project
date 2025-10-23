import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import NewCar from "./pages/NewCar";
import CarDetail from "./pages/CarDetail";
import NavBar from "./components/NavBar";
import React, { useState } from "react";
import EditCar from "./pages/EditCar";


function App() {
  const [searchBrand, setSearchBrand] = useState("");
  return (
    <Router>
      <NavBar searchBrand={searchBrand} setSearchBrand={setSearchBrand} />
      <Routes>
        <Route path="/" element={<Home searchBrand={searchBrand} setSearchBrand={setSearchBrand} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new-car" element={<NewCar />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/edit-car/:id" element={<EditCar />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
