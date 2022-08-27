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
            startDate:'',endDate:'',
            statusList:[{'id':'%','status':'All'}], statusId:'%',
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
        if(this.state.startDate.trim().length>0) url+="&startDate="+this.state.startDate;
        if(this.state.endDate.trim().length>0) url+="&endDate="+this.state.endDate;
        return url;
    }

    componentDidMount() {
        Network.get(this.buildRequestUrl()).then((data)=>{
            this.setState({
                tickets:data['data']['tickets'],
                currentPage:data['data']['pageIndex'], totalPages:data['data']['totalPages'],
                pageSize:data['data']['pageSize'], recordCount:data['data']['recordCount'],
                statusList:[{'id':'%','status':'All'},...data['data']['statusList']],
                statusTagList:[{'statusTag':'%','tagDescription':'All'},...data['data']['statusTagList']]
            })
        })
    }

    getTimeDif(totalMin,firstLimit,secondLimit){
        let color='green';
        if(totalMin===null) return '---'
        if(totalMin>firstLimit) color='blue';
        if(totalMin>secondLimit) color='red';
        let text = '';
        let d=0,hr=0,min=totalMin;
        hr=Math.floor(min/60);
        min=min%60;
        d=Math.floor(hr/24);
        hr=hr%24;
        text = (d>0?d+'d':'')+' '+(hr>0?hr+'h':'')+' '+min+'m';
        return <b style={{color:color}}>{text}</b>;
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
                                        {st.tagDescription+(st['ticketCount']?' ('+st['ticketCount']+')':'')}
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
                                        {s.status+(s['ticketCount']?' ('+s['ticketCount']+')':'')}
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
                            <div className="col-lg-2 p-3">
                                <TextField label="Start Date" variant="standard"
                                           InputLabelProps={{ shrink: true }}
                                    type="date" value={this.state.startDate}
                                           onChange={(e)=>{this.setState({startDate:e.target.value})}}
                                />
                            </div>
                            <div className="col-lg-1"> </div>
                            <div className="col-lg-2 p-3">
                                <TextField label="End Date" variant="standard"
                                           type="date" InputLabelProps={{ shrink: true }}
                                           value={this.state.endDate}
                                           onChange={(e)=>{this.setState({endDate:e.target.value})}}
                                />
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
                            {/*<tr >*/}
                            {/*    <th style={{background:'#f5b453'}} colSpan={2}>Ticket Raiser</th>*/}
                            {/*    <th style={{background:'#889df2'}} colSpan={4}>Ticket Info</th>*/}
                            {/*    <th style={{background:'#95baa6'}} colSpan={3}>Ticket Resolver</th>*/}
                            {/*</tr>*/}
                            <tr >
                                <th> SL</th><th className="col-lg-2"> Shop</th>
                                <th className="col-lg-1"> Ticket</th><th className="col-lg-2"> Current Status</th>
                                <th >Creation Time</th><th className="col-lg-3">Lead Time</th>
                                <th className="col-lg-2"> MSO</th>
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
                                            { ticket['shopName']+' ('+ticket['shopMisCode']+')'}
                                        </td>
                                        <td> { ticket['issueToken']+' ('+ticket['issueType']+')'} </td>
                                        <td> {ticket['currentStatus']['name']}</td>
                                        <td>
                                            { moment(ticket['issueDate']).format('D-MMM-YYYY h:mm a')}
                                        </td>
                                        <td>
                                            <div className="row"><label>Response: {this.getTimeDif(ticket['creationToResponseTimeMin'],10,1440)}</label></div>
                                            <div className="row"><label>Resolution: {this.getTimeDif(ticket['responseToResolutionTimeMin'],720,2880)}</label></div>
                                            <div className="row"><label>Closing: {this.getTimeDif(ticket['resolutionToClosingTimeMin'],60,1440)}</label></div>
                                        </td>
                                        <td>
                                            { ticket['currentMsoName']+' ('+ticket['currentMsoPhone']+')'}
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