import React, { Component } from 'react'
import NavBar from "./NavBar";

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div >
                <header>
                    <div className="row bg-dark navbar-dark navbar-expand-md p-3" >
                        <div className="col-lg-1">
                            <div className="row">
                                <div className="col-lg-6"><img style={{height:'40px',width:'40px'}} src={process.env.PUBLIC_URL+'/akg_logo.png'}/></div>
                                <div className="col-lg-6"><label className="navbar-brand"><b>সেবা</b></label></div>
                            </div>
                        </div>
                        <div className="col-lg-8"> </div>
                        <div id="nav_bar" className="col-lg-3"><NavBar/></div>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header