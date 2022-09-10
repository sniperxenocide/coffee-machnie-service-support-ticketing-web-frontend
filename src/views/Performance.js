import React, {Component, useState} from 'react';
import Network from "../utils/network";
import ServicePerformance from "../report/ServicePerformance";
import TextField from "@mui/material/TextField";
import MachinePerformance from "../report/MachinePerformance";
import {Switch} from "react-router-dom";

export default class Performance extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedPerformanceReport:0
        }
    }

    componentDidMount() {}

    getPerformanceReport(){
        if(this.state.selectedPerformanceReport===0) return <ServicePerformance/>;
        else if(this.state.selectedPerformanceReport===1) return <MachinePerformance/>;

    }

    render() {
        return <div>
            <label> </label>
            <div className='container'>
                <div className='row'>
                    <div className="col-lg-4">
                        <TextField
                            inputProps={{style: {fontSize: 20}}}
                            value={this.state.selectedPerformanceReport}
                            onChange={(e) => {this.setState({selectedPerformanceReport:parseInt(e.target.value)},()=>{this.forceUpdate()})}}
                            select fullWidth label="Performance Analysis"
                            variant="standard" SelectProps={{native: true,}}>
                            <option value={0}>Service Performance</option>
                            <option value={1}>Machine Performance</option>
                        </TextField>
                    </div>
                </div>
            </div>
            <div>
                {this.getPerformanceReport()}
            </div>

        </div>
    }
}