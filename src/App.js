import React from "react";
import Login from "./screens/Login";
import ProductList from "./screens/ProductList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./screens/SignUp";
import AddProduct from "./screens/AddProduct";
import Profile from "./screens/Profile";
import NavBar from "./nav";
import Footer from "./footer";
import UpdateProduct from "./screens/UpdateProduct";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/updateProduct/:id" element={<UpdateProduct />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
