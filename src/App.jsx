import { useState } from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-toastify/dist/ReactToastify.css';
// import './Login.css';
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
import Home from './Components/Home' 
import GateKepper from './Components/GateKepper'
 import ConfirmPassword from './Components/ConfirmPassword'
import ForgetPasswordPage from './Components/ForgetPasswordPage'
import HomePage from './Components/HomePage'
import LandingPage from './Components/LandingPage'
import RegisterPage from './Components/RegisterPage'
import LoginPage from './Components/LoginPage'
import Setup from './Components/Setup';
import ComponentSupplier from './Components/supplier/ComponentSupplier';
import ListSupplier from './Components/supplier/ListSupplier';
import ListVehicle from './Components/vehicle/ListVehicle';
import ListTransporter from './Components/transporter/ListTransporter';
import TransporterComponent from './Components/transporter/TransporterComponent';
import VehicleComponent from './Components/vehicle/VehicleComponent';
import ListDriver from './Components/driver/ListDriver';
import DriverComponent from './Components/driver/DriverComponent';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GateUser from './Components/gateUser/GateUser';
import ListGateUser from './Components/gateUser/ListGateUser';


function App() {
  const Footer = () => {
    return (
        <p className="text-center" style={FooterStyle}>Designed & coded by <a href="https://izemspot.netlify.com" target="_blank" rel="noopener noreferrer">IZEMSPOT</a></p>
    );
};

const FooterStyle = {
    background: "#222",
    fontSize: ".8rem",
    color: "#fff",
    // position: "absolute",
    bottom: 0,
    padding: "1rem",
    margin: 0,
    width: "100%",
    opacity: ".5"
};

  // const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  // const OpenSidebar = () => {
  //   setOpenSidebarToggle(!openSidebarToggle)
  // }

  return (
    <Router>
    <div className='App'>
      {/* <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/> */}
      <Routes>
        <Route path="/homepage" element={<Home/>} exact />
        {/* <Route path="/sidebar" element={<Sidebar/>} exact /> */}
        {/* <Route path="/gk" element={<GateKepper/>} exact /> */}

                   <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forget-password" element={<ForgetPasswordPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path='/retype-password' element={<ConfirmPassword />}></Route>
                    <Route path='/setup' element={<Setup/>}></Route>
                    <Route path='/add-supplier' element={<ComponentSupplier />}></Route>
                    <Route path='/get-supplier' element= {<ListSupplier />}></Route>
                    <Route path='/get-vehicles' element= {<ListVehicle />}></Route>
                    <Route path='/add-vehicles' element={<VehicleComponent />}></Route>
                    <Route path='/edit-vehicles/:id' element={<VehicleComponent />}></Route>
                    <Route path='/get-transporters' element ={<ListTransporter />}></Route>
                    <Route path='/add-transporters' element ={<TransporterComponent />}></Route>
                    <Route path='/edit-transporters/:id' element ={<TransporterComponent />}></Route>
                    <Route path='/get-driver' element={<ListDriver />}></Route>
                    <Route path='/add-driver' element={DriverComponent}></Route>
                    <Route path='/edit-driver/:driverId' element={DriverComponent}></Route>
                    <Route path='/gate-user' element={<GateUser />}></Route>
                    <Route path='/get-transaction' element= {<ListGateUser />}></Route>


      </Routes>
    </div>
    <ToastContainer />

  </Router>
  
   
  )
}

export default App