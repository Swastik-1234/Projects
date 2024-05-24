// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
//import Register from './auth/Register';
import Home from './auth/home';
import ProductListing from './products/ProductListing';
import './App.css'
import './orders/MyOrders'
import MyOrders from './orders/MyOrders';
import Navbar from './auth/navbar';
function App() {
  return (
    <Router>
      <div>
      <Navbar />
      
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/myorders" element={<MyOrders />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
