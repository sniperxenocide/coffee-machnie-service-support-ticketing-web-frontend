import React,{Component} from "react";
import Network from "../network";
import moment from "moment";

class TicketList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tickets:[]
        }
    }

    componentDidMount() {
        Network.get('/api/v1/issue/all').then((data)=>{
            this.setState({tickets:data['data']})
        })
    }

    render() {
        return(
            <div>
                <h2 className="text-center">Ticket Dashboard</h2>
                <div style={{overflowY:'auto',maxHeight:'550px'}} className = "row" >
                    <table style={{verticalAlign:'middle'}} className = "table table-striped table-bordered">
                        <colgroup>
                            <col style={{border:'1.1px solid #f5b453'}} span={3}/>
                            <col style={{border:'1.1px solid #889df2'}} span={3}/>
                            <col style={{border:'1.1px solid #95baa6'}} span={3}/>
                        </colgroup>
                        <thead className= "text-center" style={{background:'#e6f7ee',position:'sticky',top:0,zIndex:1}}>
                            <tr>
                                <th style={{background:'#f5b453'}} colSpan={4}>Ticket Raiser</th>
                                <th style={{background:'#889df2'}} colSpan={3}>Ticket Info</th>
                                <th style={{background:'#95baa6'}} colSpan={3}>Ticket Resolver</th>
                            </tr>
                            <tr className="text-nowrap">
                                <th> SL</th>
                                <th> Shop</th>
                                <th> Location</th>
                                <th> Machine</th>
                                <th> Ticket</th>
                                <th> Current Status</th>
                                <th> Creation Time</th>
                                <th> MSO Name</th>
                                <th> MSO Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.tickets.map(
                                (ticket,idx) =>
                                    <tr key = {ticket.id}>
                                        <td>{idx+1}</td>
                                        <td> {ticket['shopName']+' ('+ticket['shopMisCode']+') -'+ticket['shopPhone']}</td>
                                        <td > {ticket['division']+" -"+ticket['region']+" -"+ticket['territory']+" -"+ticket['shopAddress']}</td>
                                        <td> { ticket['machineNumber']+' -'+ticket['machineModel']+' -'+ticket['machineBrand']} </td>
                                        <td className="text-nowrap" > { ticket['issueToken']} </td>
                                        <td> {ticket['currentStatus']['name']}</td>
                                        <td className="text-nowrap"> {moment(ticket['issueDate']).format('D-MMM-YYYY h:mm a')}</td>
                                        <td> {ticket['currentMsoName']}</td>
                                        <td> {ticket['currentMsoPhone']}</td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
                <br/>
            </div>
        )
    }
}

export default TicketList