import React,{Component} from "react";
import Network from "../network";
import moment from "moment";
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TicketDetail from "./TicketDetail";
import Box from "@mui/material/Box";
import FilterIcon from '@mui/icons-material/FilterList';

class TicketList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            tickets:[], currentPage:1, totalPages:1, pageSize:10,recordCount:1,
            shopCode:'', msoPhone:'',ticketNumber:'',machineNumber:'',status:'',
            statusList:[{'id':'%','name':'All'}], statusId:'%',
            statusTagList:[{'statusTag':'%','tagDescription':'All'}],statusTag:'%',
            dialogOpen:false,selectedTicketIdx:1,
            searchBoxVisible:false
        }
        this.ticketListApi = '/api/v1/issue/all';
    }

    buildRequestUrl(){
        let url = this.ticketListApi+'?page='+this.state.currentPage;
        if(this.state.shopCode.trim().length>0) url+="&shopCode="+this.state.shopCode.trim();
        if(this.state.machineNumber.trim().length>0) url+="&machineNumber="+this.state.machineNumber.trim();
        if(this.state.msoPhone.trim().length>0) url+="&msoPhone="+this.state.msoPhone.trim();
        if(this.state.ticketNumber.trim().length>0) url+="&ticketNumber="+this.state.ticketNumber.trim();
        if(this.state.statusId!=='%') url+="&statusId="+this.state.statusId;
        if(this.state.statusTag!=='%') url+="&statusTag="+this.state.statusTag;
        return url;
    }

    componentDidMount() {
        Network.get(this.buildRequestUrl()).then((data)=>{
            this.setState({
                tickets:data['data']['tickets'],
                currentPage:data['data']['pageIndex'], totalPages:data['data']['totalPages'],
                pageSize:data['data']['pageSize'], recordCount:data['data']['recordCount'],
                statusList:[{'id':'%','name':'All'},...data['data']['statusList']],
                statusTagList:[{'statusTag':'%','tagDescription':'All'},...data['data']['statusTagList']]
            })
        })
    }

    handleDialogClose=()=>{
        this.setState({dialogOpen:false});
    }

    render() {
        return(
            <div>
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleDialogClose}
                    scroll='paper' fullWidth={true} maxWidth='lg'
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description">
                    <DialogTitle textAlign='center'>Ticket Detail</DialogTitle>
                    <DialogContent dividers={true}>
                        <TicketDetail ticket={this.state.tickets[this.state.selectedTicketIdx]}/>
                    </DialogContent>
                    <DialogActions><Button onClick={this.handleDialogClose}>Close</Button></DialogActions>
                </Dialog>
                <label> </label>
                <h2 className="text-center">Service Monitoring</h2>
                <label> </label>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <TextField
                                value={this.state.statusTag}
                                onChange={(e) => {
                                    this.setState({statusTag:e.target.value,statusId:'%'},()=>this.componentDidMount())}}
                                select fullWidth label="Status Group"
                                variant="standard" SelectProps={{native: true,}}>
                                {this.state.statusTagList.map((st) => (
                                    <option key={st.statusTag} value={st.statusTag}>
                                        {st.tagDescription}
                                    </option>
                                ))}
                            </TextField>
                        </div>
                        <div className="col-lg-1"> </div>
                        <div className="col-lg-4 ">
                            <TextField
                                select fullWidth label="Ticket Status"
                                value={this.state.statusId}
                                onChange={(e) => {this.setState({statusId:e.target.value},()=>this.componentDidMount())}}
                                variant="standard" SelectProps={{native: true,}}
                            >
                                {this.state.statusList.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </TextField>
                        </div>
                        <div className="col-lg-2"> </div>
                        <div className="col-lg-2 p-3">
                            <Button fullWidth variant="contained" endIcon={<FilterIcon />}
                                    onClick={(e)=>{
                                        this.setState({searchBoxVisible:!this.state.searchBoxVisible})}}
                            >Filter </Button>
                        </div>
                    </div>

                    <Box style={{display:this.state.searchBoxVisible?'block':'none'}} sx={{ border:'1px solid grey',borderRadius:'8px',margin:'10px 0px',padding:'15px' }}>
                        <label><b>Advanced Search</b></label>
                        <div className="row">
                            <div className="col-lg-2 p-3" >
                                <TextField id="shop_code" label="Shop Code" variant="standard" fullWidth
                                           onChange={(e) => {this.setState({shopCode:e.target.value})}}
                                           value={this.state.shopCode}/>
                            </div>
                            <div className="col-lg-1"> </div>
                            <div className="col-lg-2 p-3">
                                <TextField id="machine_number" label="Machine Number" variant="standard" fullWidth
                                           onChange={(e) => {this.setState({machineNumber:e.target.value})}}
                                           value={this.state.machineNumber}/>
                            </div>
                            <div className="col-lg-1"> </div>
                            <div className="col-lg-2 p-3">
                                <TextField id="mso_phone" label="MSO Phone" variant="standard" fullWidth
                                           onChange={(e) => {this.setState({msoPhone:e.target.value})}}
                                           value={this.state.msoPhone}/>
                            </div>
                            <div className="col-lg-1"> </div>
                            <div className="col-lg-2 p-3">
                                <TextField id="ticket_no" label="Ticket Number" variant="standard" fullWidth
                                           onChange={(e) => {this.setState({ticketNumber:e.target.value})}}
                                           value={this.state.ticketNumber}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-11"> </div>
                            <div className="col-lg-1">
                                <Button fullWidth onClick={(e)=>{
                                    this.setState({currentPage:1},()=>{
                                        this.componentDidMount();
                                    });}}
                                        variant="contained" endIcon={<SearchIcon />}> </Button>
                            </div>
                        </div>
                    </Box>
                    <div className="row">
                        <div className="col-lg-3 my-auto p-3">
                            <label><b>
                                Showing {(this.state.currentPage-1)*this.state.pageSize+1}&nbsp;-&nbsp;
                                {(this.state.currentPage-1)*this.state.pageSize+this.state.tickets.length}
                                &nbsp;of&nbsp;{this.state.recordCount}
                            </b></label>
                        </div>
                        <div className="col-lg-9 p-3" >
                            <Pagination count={this.state.totalPages} page={this.state.currentPage}
                                        onChange={(e,val)=>{
                                            this.setState({currentPage:val},
                                                ()=>{this.componentDidMount();})}}
                                        size={"large"}/>
                        </div>
                    </div>
                </div>
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
                                    <tr onClick={()=>{
                                        this.setState(
                                            {dialogOpen:true,selectedTicketIdx:idx});
                                    }} key = {ticket.id}>
                                        <td>{(this.state.currentPage-1)*this.state.pageSize+idx+1}</td>
                                        <td>
                                            <div className="row"><label><b>Name:</b></label></div>
                                            <div className="row"><label>{ ticket['shopName']}</label></div>
                                            <div className="row"><label><b>MIS Code:</b></label></div>
                                            <div className="row"><label>{ ticket['shopMisCode']}</label></div>
                                            <div className="row"><label><b>Owner:</b></label></div>
                                            <div className="row"><label>{ ticket['shopOwner']}</label></div>
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
                                        <td className="text-nowrap" > { ticket['issueToken']+' ('+ticket['issueType']+')'} </td>
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