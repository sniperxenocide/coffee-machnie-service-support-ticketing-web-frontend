import React, { Component } from 'react'
import NavBar from "./NavBar";
import LinearProgress from '@mui/material/LinearProgress';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dialogOpen:true
        }
    }

    static handleLoader(){

    }

    render() {
        return (
            <div >
                <header>
                    <div className="row bg-dark navbar-dark navbar-expand-md p-3">
                        <div className="col-lg-1">
                            <div className="row">
                                <div className="col-lg-6"><img style={{height:'40px',width:'40px'}} src={process.env.PUBLIC_URL+'/akg_logo.png'}/></div>
                                <div className="col-lg-6"><label className="navbar-brand"><b>সেবা</b></label></div>
                            </div>
                        </div>
                        <div className="col-lg-7"> </div>
                        <div id="nav_bar" className="col-lg-4"><NavBar/></div>
                    </div>
                    <div className="row" id="progress_loader_div" style={{display:'none'}}>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={this.state.dialogOpen}
                        >
                            <CircularProgress color="secondary" />
                        </Backdrop>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header