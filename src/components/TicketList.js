import React,{Component} from "react";
import Network from "../network";
import moment from "moment";
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';

class TicketList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            tickets:[], currentPage:1, totalPages:1, pageSize:10,
            shopCode:'', msoPhone:'',ticketNumber:'',machineNumber:'',status:''
        }
        this.ticketListApi = '/api/v1/issue/all';
    }

    buildRequestUrl(){
        let url = this.ticketListApi+'?page='+this.state.currentPage;
        if(this.state.shopCode.trim().length>0) url+="&shopCode="+this.state.shopCode.trim();
        if(this.state.machineNumber.trim().length>0) url+="&machineNumber="+this.state.machineNumber.trim();
        if(this.state.msoPhone.trim().length>0) url+="&msoPhone="+this.state.msoPhone.trim();
        if(this.state.ticketNumber.trim().length>0) url+="&ticketNumber="+this.state.ticketNumber.trim();
        return url;
    }

    componentDidMount() {
        Network.get(this.buildRequestUrl()).then((data)=>{
            this.setState({
                tickets:data['data']['tickets'],
                currentPage:data['data']['pageIndex'],
                totalPages:data['data']['totalPages'],
                pageSize:data['data']['pageSize']
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
                <label> </label>
                <h2 className="text-center">Ticket Dashboard</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2" >
                            <TextField id="shop_code" label="Shop Code" variant="standard" fullWidth
                                       onChange={(e) => {this.setState({shopCode:e.target.value})}}
                                       // helperText="Search with Shop Code"
                                       value={this.state.shopCode}/>
                        </div>
                        <div className="col-lg-1"> </div>
                        <div className="col-lg-2">
                            <TextField id="machine_number" label="Machine Number" variant="standard" fullWidth
                                       onChange={(e) => {this.setState({machineNumber:e.target.value})}}
                                       // helperText="Search with Machine Number"
                                       value={this.state.machineNumber}/>
                        </div>
                        <div className="col-lg-1"> </div>
                        <div className="col-lg-2">
                            <TextField id="mso_phone" label="MSO Phone" variant="standard" fullWidth
                                       onChange={(e) => {this.setState({msoPhone:e.target.value})}}
                                       // helperText="Search with MSO Phone"
                                       value={this.state.msoPhone}/>
                        </div>
                        <div className="col-lg-1"> </div>
                        <div className="col-lg-2">
                            <TextField id="ticket_no" label="Ticket Number" variant="standard" fullWidth
                                       onChange={(e) => {this.setState({ticketNumber:e.target.value})}}
                                       // helperText="Search with Ticket Number"
                                       value={this.state.ticketNumber}/>
                        </div>
                    </div>
                    <label> </label>
                    <div className="row">
                        <div className="col-lg-2">
                            <TextField
                                id="standard-select-currency"
                                select fullWidth label="Status"
                                // value={currency}
                                // onChange={handleChange}
                                // helperText="Select Ticket Status"
                                variant="standard"
                            />
                        </div>
                        <div className="col-lg-1"> </div>
                        <div className="col-lg-2">
                            <Button onClick={(e)=>{
                                this.setState({currentPage:1},()=>{
                                    this.componentDidMount();
                                });
                            }} variant="contained" endIcon={<SearchIcon />}>
                                Search
                            </Button>
                        </div>

                    </div>
                    <label> </label>
                    <div className="row">
                        <div className="col-lg-2 my-auto">
                            <label><b>
                                Showing {(this.state.currentPage-1)*this.state.pageSize+1}-{this.state.currentPage*this.state.pageSize} of {this.state.totalPages*this.state.pageSize}
                            </b></label>
                        </div>
                        <div className="col-lg-10" >
                            <Pagination count={this.state.totalPages} page={this.state.currentPage}
                                        onChange={this.handleChange} size={"large"}/>
                        </div>
                    </div>
                </div>
                <br/>

                <div style={{overflowY:'auto',maxHeight:'550px'}} className = "row" >
                    <table style={{verticalAlign:'middle'}} className = "table table-striped table-bordered">
                        <colgroup>
                            <col style={{border:'1.1px solid #f5b453'}} span={3}/>
                            <col style={{border:'1.1px solid #889df2'}} span={3}/>
                            <col style={{border:'1.1px solid #95baa6'}} span={3}/>
                        </colgroup>
                        <thead className= "text-center text-nowrap" style={{background:'#e6f7ee',position:'sticky',top:0,zIndex:1}}>
                            <tr >
                                <th style={{background:'#f5b453'}} colSpan={4}>Ticket Raiser</th>
                                <th style={{background:'#889df2'}} colSpan={3}>Ticket Info</th>
                                <th style={{background:'#95baa6'}} colSpan={3}>Ticket Resolver</th>
                            </tr>
                            <tr >
                                <th> SL</th><th> Shop</th><th> Location</th><th> Machine</th>
                                <th> Ticket</th><th> Current Status</th><th> Time</th><th> MSO</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.tickets.map(
                                (ticket,idx) =>
                                    <tr key = {ticket.id}>
                                        <td>{(this.state.currentPage-1)*this.state.pageSize+idx+1}</td>
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
                <label> </label>
            </div>
        )
    }
}

export default TicketList