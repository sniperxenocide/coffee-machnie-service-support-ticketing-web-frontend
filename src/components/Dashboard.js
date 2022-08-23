import React,{ Component } from 'react';
import Network from "../network";
import { Chart } from "react-google-charts";

const colors = ["#f8bd19","#33ccff","#ffcccc","#ccff66"];

export default class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            statusList:[],statusTagList:[],
            totalTickets:0,openTickets:0,closedTickets:0
        }
        this.dashboardApi='/api/v1/web/dashboard';
    }

    componentDidMount() {
        Network.get(this.dashboardApi).then((data)=>{
            this.setState({
                statusList:data['data']['statusList'],
                statusTagList:data['data']['statusTagList'],
            },()=>{
                let tt=0,ot=0,ct=0;
                this.state.statusTagList.forEach((st)=>{
                    tt+=st['ticketCount'];
                    if(st['statusTag']==='END') ct=st['ticketCount'];
                })
                ot=tt-ct;
                this.setState({openTickets:ot,totalTickets:tt,closedTickets:ct})
            })
        })
    }

    render() {


        return(
            <div>
                <label> </label>
                <h2 className="text-center">Analytics Dashboard</h2>
                <label> </label>
                <div className='container'>
                    <div className="row">
                        <div className="col-lg-6" >
                            <div className="row" style={{fontSize:18}}>
                                <div className="row">
                                    <div className="col-lg-3"> </div>
                                    <div className="col-lg-9"><label><b>Total Tickets: </b></label>&nbsp;&nbsp;&nbsp;
                                        <label>{this.state.totalTickets}</label></div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3"> </div>
                                    <div className="col-lg-9"><label><b>Open Tickets: </b></label>&nbsp;&nbsp;
                                        <label>{this.state.openTickets}</label></div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-3"> </div>
                                    <div className="col-lg-9"><label><b>Closed Tickets: </b></label>&nbsp;
                                        <label>{this.state.closedTickets}</label> </div>
                                </div>
                            </div>
                            <div className="row"><Chart
                                chartType="PieChart"
                                data={[
                                    ["Status", "Ticket Count"],...
                                        this.state.statusTagList.map(st=>
                                            st['statusTag']!=='END'?
                                                [st['tagDescription']+' ('+st['ticketCount']+')',st['ticketCount']]
                                                : ["",0])
                                ]}
                                options={{
                                    titleTextStyle: {
                                        color: "black",
                                        fontName: 'Times New Roman', // i.e. 'Times New Roman'
                                        fontSize: 20,
                                        bold: true,    // true or false
                                        italic: true  // true of false
                                    },
                                    title: "Status Wise Ticket Summary",
                                    is3D: true,
                                }}
                                width={"100%"}
                                height={"600px"}
                            /></div>

                        </div>
                        <div className="col-lg-6" >
                            <label className="col-form-label"><b>Status Wise Ticket Count</b></label>
                            <div style={{overflowY:'auto',maxHeight:'500px'}} className = "row" >
                                <table style={{verticalAlign:'middle'}} className = "table table-striped table-bordered">
                                    <thead className= "text-center text-nowrap" style={{background:'#e6f7ee',position:'sticky',top:0,zIndex:1}}>
                                    <tr >
                                        <th> SL</th><th className="col-lg-6"> Status</th><th className="col-lg-5"> Status Group</th>
                                        <th className="col-lg-1"> Ticket Count</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.statusList.map(
                                            (s,idx)=>
                                                <tr key={s.id}>
                                                    <td>{idx+1}</td>
                                                    <td>{s['status']}</td>
                                                    <td>{s['tagDescription']}</td>
                                                    <td>{s['ticketCount']}</td>
                                                </tr>
                                        )
                                    }
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}