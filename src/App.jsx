import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
// import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-toastify/dist/ReactToastify.css';
import { Navigation } from "./components/navigation";
import { Header } from "./components/headerpage";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import "./App.css";
import SignInPage from "./components/login/LoginPage";
import SignUpPage from "./components/login/RegisterPage";
import ForgetPasswordPage from "./components/login/ForgetPasswordPage";
import ConfirmPassword from './components/login/ConfirmPassword';

 
const App = () => {
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    try {
      setLandingPageData(JsonData);
    } catch (error) {
      console.error("Error fetching JSON data:", error);
      // You can also display an error message to the user or handle the error in another way
    }
  }, []);

  return (
    <Router>
      <div >
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header data={landingPageData.Header} />
              <Features data={landingPageData.Features} />
              <About data={landingPageData.About} />
              <Services data={landingPageData.Services} />
              <Gallery data={landingPageData.Gallery} />
              <Testimonials data={landingPageData.Testimonials} />
              <Team data={landingPageData.Team} />
              <Contact data={landingPageData.Contact} />
            </>
          }
        />
        <Route path='/signin' element= {<SignInPage/>}></Route>
        <Route path='/signup' element={<SignUpPage />}></Route>
        <Route path='/forgot-password' element={< ForgetPasswordPage />}></Route>
        <Route path='/retype-password' element={<ConfirmPassword />}></Route>
      </Routes>
      <ToastContainer />

      </div>
    </Router>
  );
};

export default App;