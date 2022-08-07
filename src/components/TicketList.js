import React,{Component} from "react";
import Network from "../network";
import moment from "moment";
import Pagination from '@mui/material/Pagination';

class TicketList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            tickets:[],
            currentPage:1,
            totalPages:1
        }
        this.ticketListApi = '/api/v1/issue/all';
    }

    componentDidMount() {
        let url = this.ticketListApi+'?page='+this.state.currentPage;
        Network.get(url).then((data)=>{
            this.setState({
                tickets:data['data']['tickets'],
                currentPage:data['data']['pageIndex'],
                totalPages:data['data']['totalPages']
            })
        })
    }

    handleChange=(e,val)=>{
        this.setState({
            currentPage:val
        },()=>{
            this.componentDidMount();
        });
    }

    render() {
        return(
            <div>
                <h2 className="text-center">Ticket Dashboard</h2>
                <div >
                    <Pagination count={this.state.totalPages} page={this.state.currentPage}
                                onChange={this.handleChange} size={"large"}/>
                </div>
                <br/>
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
                                <th> Time</th>
                                <th> MSO</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.tickets.map(
                                (ticket,idx) =>
                                    <tr key = {ticket.id}>
                                        <td>{idx+1}</td>
                                        <td>
                                            <div className="row"><label><b>Name:</b></label></div>
                                            <div className="row"><label>{ ticket['shopName']}</label></div>
                                            <div className="row"><label><b>MIS Code:</b></label></div>
                                            <div className="row"><label>{ ticket['shopMisCode']}</label></div>
                                            <div className="row"><label><b>Phone:</b></label></div>
                                            <div className="row"><label>{ ticket['shopPhone']}</label></div>
                                        </td>
                                        <td>
                                            <div className="row"><label><b>Division:</b> &nbsp;&nbsp;{ticket['division']}</label></div>
                                            <div className="row"><label><b>Region:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ticket['region']}</label></div>
                                            <div className="row"><label><b>Territory:</b>&nbsp;&nbsp;{ticket['territory']}</label></div>
                                            <div className="row"><label><b>Address:</b></label></div>
                                            <div className="row"><label>{ ticket['shopAddress']}</label></div>
                                        </td>
                                        <td>
                                            <div className="row"><label><b>Brand:</b></label></div>
                                            <div className="row"><label>{ ticket['machineBrand']}</label></div>
                                            <div className="row"><label><b>Model:</b></label></div>
                                            <div className="row"><label>{ ticket['machineModel']}</label></div>
                                            <div className="row"><label><b>Serial:</b></label></div>
                                            <div className="row"><label>{ ticket['machineNumber']}</label></div>
                                        </td>
                                        <td className="text-nowrap" > { ticket['issueToken']} </td>
                                        <td> {ticket['currentStatus']['name']}</td>
                                        <td className="text-nowrap">
                                            <div className="row"><label><b>Creation Time:</b></label></div>
                                            <div className="row"><label>{ moment(ticket['issueDate']).format('D-MMM-YYYY h:mm a')}</label></div>
                                            <div className="row"><label><b>Response Time:</b></label></div>
                                            <div className="row"><label>{ ticket['responseTime']==null?'---':moment(ticket['responseTime']).format('D-MMM-YYYY h:mm a')}</label></div>
                                            <div className="row"><label><b>Resolution Time:</b></label></div>
                                            <div className="row"><label>{ ticket['resolutionTime']==null?'---': moment(ticket['resolutionTime']).format('D-MMM-YYYY h:mm a')}</label></div>
                                            <div className="row"><label><b>Closing Time:</b></label></div>
                                            <div className="row"><label>{ ticket['closingTime']==null?'---': moment(ticket['closingTime']).format('D-MMM-YYYY h:mm a')}</label></div>
                                        </td>
                                        <td>
                                            <div className="row"><label><b>Name:</b></label></div>
                                            <div className="row"><label>{ ticket['currentMsoName']}</label></div>
                                            <div className="row"><label><b>Phone:</b></label></div>
                                            <div className="row"><label>{ ticket['currentMsoPhone']}</label></div>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TicketList