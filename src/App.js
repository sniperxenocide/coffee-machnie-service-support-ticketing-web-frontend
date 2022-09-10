import './App.css';
import React,{ useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Routes,useLocation } from 'react-router-dom'
import TicketList from "./views/TicketList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import ServicePerformance from "./report/ServicePerformance";
import Performance from "./views/Performance";


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
                <Route path = "/performance" element = {<Performance/>}/>
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
  );
}

export default App;
