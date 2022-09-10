import React,{Component} from "react";
import Network from "../utils/network";
import MachineWiseTicketCountReport from "./MachineWiseTicketCountReport";
import MachineWiseRootCauseCountReport from "./MachineWiseRootCauseCountReport";

export default class MachinePerformance extends Component{
    constructor(props) {
        super(props);
        this.state={};
    }

    componentDidMount() {}

    styleProps={border:'1px solid black',padding:'25px',borderRadius:'5px'};

    render() {
        return <div>
            <label> </label>
            <h2 className="text-center">Machine Performance Analysis</h2>
            <label> </label>
            <div style={this.styleProps}>
                <MachineWiseTicketCountReport/>
            </div>
            <label> </label>
            <div style={this.styleProps}>
                <MachineWiseRootCauseCountReport/>
            </div>
        </div>
    }
}