import "./App.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Homepage from './pages/Homepage'
 
import Home from "./Homefol";
// import Navbar from "./components/navBar";
import particles from "./utils.js/particles";
import Navbar from "./Navbar";
import Reviews from "./pages/Reviews";
import ProductsComponent from "./pages/ProductComponent";
import Analytics from "./components/Analytics";
import Login from "./pages/Login";
import { FaRegistered } from "react-icons/fa";
import Register from "./pages/Register";

function App() {
  const location = useLocation();
  console.log(location);

  const handleInit = async (main) => {
    await loadFull(main);
  };

  const renderParticleJsInHomePage = location.pathname === "/";

  return (
    <div className="App">
      {/* particles js */}

      {renderParticleJsInHomePage && (
        <Particles id="particles" options={particles} init={handleInit} />
      )}

      {/* navbar */}
      <Navbar/>

      {/* main page content */}
      <div className="App__main-page-content">
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path='/home' element={<Homepage/>} />
        <Route path='/review' element={<Reviews/>} />
        <Route path='/feed' element={<ProductsComponent/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        
        {/* <Route path='/analytics' element={<Analytics/>} /> */}
        {/* <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} /> */} 
      </Routes>
      </div>

    </div>
  );
}

export default App;

// // import "./App.scss";
// import { Routes, Route, useLocation } from "react-router-dom";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.scss'
// // import { Route,Routes } from 'react-router-dom'
// import Homepage from './pages/Homepage'
// import Register from './pages/Register'
// import Login from './pages/Login'
// // import Navbar from "./components/navBar";
// import particles from "./utils.js/particles";
// import Home from "./Homefol/Home";

// function App() {
//   const location = useLocation();
//   console.log(location);

//   const handleInit = async (main) => {
//     await loadFull(main);
//   };

//   const renderParticleJsInHomePage = location.pathname === "/";

//   return (
//     <div className="App">
//       {/* particles js */}

//       {renderParticleJsInHomePage && (
//         <Particles id="particles" options={particles} init={handleInit} />
//       )}

//       {/* navbar */}
//       {/* <Navbar /> */}

//       {/* main page content */}
//       <div className="App__main-page-content">
//       <Routes>
//         <Route path="/" element = {<Home/>} />
//          <Route path='/home' element={<Homepage/>} />
//        <Route path='/register' element={<Register/>} />
//          <Route path='/login' element={<Login/>} />
//        </Routes>
//       </div>

//     </div>
//   );
// }

// export default App;


// // function App() {
// //   return (
// //     <>
// //       <Routes>
// //         <Route path='/' element={<Homepage/>} />
// //         <Route path='/register' element={<Register/>} />
// //         <Route path='/login' element={<Login/>} />
// //       </Routes>
// //     </>
// //   )
// // }

// // export default App
