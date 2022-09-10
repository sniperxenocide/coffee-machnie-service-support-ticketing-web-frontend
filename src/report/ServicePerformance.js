import React,{Component} from "react";
import Network from "../utils/network";
import moment from "moment";
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TicketDetail from "../components/TicketDetail";
import Box from "@mui/material/Box";
import FilterIcon from '@mui/icons-material/FilterList';
import TicketList from "../views/TicketList";
import CommonMethods from "../utils/CommonMethods";

class ServicePerformance extends Component {
    constructor(props) {
        super(props);
        this.ticketListApi = '/api/v1/issue/all';
        this.state = {
            startDate:'',endDate:'',
            creationToResolveMinStart:'',creationToResolveMinEnd:'',
            creationToClosingMinStart:'',creationToClosingMinEnd:'',
            tickets:[], currentPage:1, totalPages:1, pageSize:10,recordCount:1,
            dialogOpen:false,selectedTicketIdx:1
        }
    }

    buildUrl(){
        let hrToMinConst = 60;
        let closingWithNull='true';
        let url = this.ticketListApi+'?page='+this.state.currentPage;
        url+="&creationToResolveWithNull=false";
        if(this.state.startDate.trim().length>0) url+="&startDate="+this.state.startDate;
        if(this.state.endDate.trim().length>0) url+="&endDate="+this.state.endDate;
        if(this.state.creationToResolveMinStart.trim().length>0)
            url+="&creationToResolveMinStart="+(parseInt(this.state.creationToResolveMinStart)*hrToMinConst);
        if(this.state.creationToResolveMinEnd.trim().length>0)
            url+="&creationToResolveMinEnd="+(parseInt(this.state.creationToResolveMinEnd)*hrToMinConst);
        if(this.state.creationToClosingMinStart.trim().length>0){
            closingWithNull = 'false';
            url+="&creationToClosingMinStart="+(parseInt(this.state.creationToClosingMinStart)*hrToMinConst);
        }
        if(this.state.creationToClosingMinEnd.trim().length>0){
            closingWithNull = 'false';
            url+="&creationToClosingMinEnd="+(parseInt(this.state.creationToClosingMinEnd)*hrToMinConst);
        }
        url+="&creationToClosingWithNull="+closingWithNull;
        url+="&sortBy=creationToResolutionTimeMin&sortDir=desc";
        return url;
    }

    componentDidMount() {
        Network.get(this.buildUrl()).then((data)=>{
            this.setState({
                tickets:data['data']['tickets'],
                currentPage:data['data']['pageIndex'], totalPages:data['data']['totalPages'],
                pageSize:data['data']['pageSize'], recordCount:data['data']['recordCount']
            })
        })
    }

    handleDialogClose=()=>{
        this.setState({dialogOpen:false});
    }

    getFormattedDate(date){
        try {
            if(date===null) return '---';
            return moment(date).format('D-MMM-YYYY h:mm a')
        }catch (e){return "---"}
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
                <h2 className="text-center">Service Performance Analysis</h2>
                <label> </label>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <Box sx={{ border:'1px solid grey',borderRadius:'8px',margin:'10px 0px',padding:'15px' }}>
                                <div className="row"><label><b>Resolution Lead Time</b></label></div>
                                <div className="row">
                                    <div className="col-lg-6 p-3" >
                                        <TextField label="Hours More Than" variant="standard" fullWidth
                                                   type='number' onChange={(e) =>{
                                                       {this.setState({creationToResolveMinStart:e.target.value})}
                                                   } }
                                                   value={this.state.creationToResolveMinStart}/>
                                    </div>
                                    <div className="col-lg-6 p-3">
                                        <TextField label="Hours Less Than" variant="standard" fullWidth
                                                   type='number' onChange={(e) => {
                                                       {this.setState({creationToResolveMinEnd:e.target.value})}}}
                                                   value={this.state.creationToResolveMinEnd}/>
                                    </div>
                                </div>
                            </Box>
                        </div>
                        <div className="col-lg-4">
                            <Box sx={{ border:'1px solid grey',borderRadius:'8px',margin:'10px 0px',padding:'15px' }}>
                                <div className="row"><label><b>Closing Lead Time</b></label></div>
                                <div className="row">
                                    <div className="col-lg-6 p-3" >
                                        <TextField label="Hours More Than" variant="standard" fullWidth
                                                   type='number' onChange={(e) =>{
                                                       {this.setState({creationToClosingMinStart:e.target.value})}
                                                   } }
                                                   value={this.state.creationToClosingMinStart}/>
                                    </div>
                                    <div className="col-lg-6 p-3">
                                        <TextField label="Hours Less Than" variant="standard" fullWidth
                                                   type='number' onChange={(e) =>{
                                                       {this.setState({creationToClosingMinEnd:e.target.value})}
                                                   } }
                                                   value={this.state.creationToClosingMinEnd}/>
                                    </div>
                                </div>
                            </Box>
                        </div>
                        <div className="col-lg-4">
                            <div className="row">
                                <div className="col-lg-6 p-3">
                                    <TextField label="Start Date" variant="standard"
                                               InputLabelProps={{ shrink: true }}
                                               type="date" value={this.state.startDate}
                                               onChange={(e)=>{this.setState({startDate:e.target.value})}}
                                    />
                                </div>
                                <div className="col-lg-6 p-3">
                                    <TextField label="End Date" variant="standard"
                                               type="date" InputLabelProps={{ shrink: true }}
                                               value={this.state.endDate}
                                               onChange={(e)=>{this.setState({endDate:e.target.value})}}
                                    />
                                </div>
                            </div>
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
                <div className="row" style={{overflowY:'auto',maxHeight:'550px'}}>
                    <table style={{verticalAlign:'middle'}} className = "table table-striped table-bordered">
                        <thead className= "text-center text-nowrap" style={{background:'#e6f7ee',position:'sticky',top:0,zIndex:1}}>
                            <tr >
                                <th> SL</th><th className="col-lg-1"> Ticket</th><th className="col-lg-2"> Current Status</th>
                                <th className="col-lg-1"> Creation Time</th><th className="col-lg-1">Response Time</th>
                                <th className="col-lg-1">Resolution Time</th><th className="col-lg-1"> Closing Time</th>
                                <th className="col-lg-2"> Resolution Lead Time</th><th className="col-lg-2"> Closing Lead Time</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.tickets.map(
                                (ticket,idx)=>
                                    <tr onClick={()=>{
                                        this.setState(
                                            {dialogOpen:true,selectedTicketIdx:idx});
                                    }}
                                        key={ticket.id}>
                                        <td>{idx+1}</td>
                                        <td>{ticket['issueToken']+' ('+ticket['issueType']+')'}</td>
                                        <td>{ticket['currentStatus']['name']}</td>
                                        <td>{ this.getFormattedDate(ticket['issueDate'])}</td>
                                        <td>{ this.getFormattedDate(ticket['responseTime'])}</td>
                                        <td>{ this.getFormattedDate(ticket['resolutionTime'])}</td>
                                        <td>{ this.getFormattedDate(ticket['closingTime'])}</td>
                                        <td>{CommonMethods.getTimeDif(ticket['creationToResolutionTimeMin'],360,1440)}</td>
                                        <td>{CommonMethods.getTimeDif(ticket['creationToClosingTimeMin'],360,1440)}</td>
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

export default ServicePerformance