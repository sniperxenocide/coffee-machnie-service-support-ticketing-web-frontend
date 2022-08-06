import './App.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import TicketList from "./components/TicketList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";

function App() {
  return (
      <div>
        <Router>
          <Header />
            {/*className="container"*/}
          <div style={{maxWidth:'95%',marginLeft:'auto',marginRight:'auto'}}>
            <Routes>
                <Route path = "/" exact element = {<Login/>}/>
                <Route path = "/login" exact element = {<Login/>}/>
                <Route path = "/tickets" element = {<TicketList/>}/>
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
  );
}

export default App;
