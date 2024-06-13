import React from 'react';
import Login from './screens/Login';
import ProductList from './screens/ProductList';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SignUp from './screens/SignUp';
import AddProduct from './screens/AddProduct';
import Profile from './screens/Profile';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element= {<ProductList/>}  />
      <Route path='/login' element = {<Login/>}  />
      <Route path='/signup' element = {<SignUp/>}/>
      <Route path='/addProduct' element ={<AddProduct/>}/>
      <Route path ='/profile' element ={<Profile/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
