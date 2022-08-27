import './App.css';
import React,{ useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Routes,useLocation } from 'react-router-dom'
import TicketList from "./components/TicketList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ServicePerformance from "./components/ServicePerformance";


function App() {

  return (
      <div >
        <Router>
          <Header/>
          <div style={{maxWidth:'95%',marginLeft:'auto',marginRight:'auto'}}>
            <Routes>
                <Route path = "/" exact element = {<Login/>}/>
                <Route path = "/login" exact element = {<Login/>}/>
                <Route path = "/tickets" element = {<TicketList/>}/>
                <Route path = "/dashboard" element = {<Dashboard/>}/>
                <Route path = "/performance" element = {<ServicePerformance/>}/>
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
  );
}

export default App;
