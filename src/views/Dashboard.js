import React, {Component, useState} from 'react';
import Network from "../utils/network";
import TicketCountReport from "../report/TicketCountReport";

export default class Dashboard extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return(
            <div>
                <label> </label>
                {/*className="text-center"*/}
                <h2 style={{color:'#5291f7'}} >Business Performance At-A-Glance</h2>
                <label> </label>
                <TicketCountReport/>
                <label> </label>
            </div>
        )
    }
}