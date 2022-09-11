import React,{Component} from "react";
import Network from "../utils/network";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import FilterIcon from "@mui/icons-material/FilterList";

export default class MachineWiseRootCauseCountReport extends Component{
    constructor(props) {
        super(props);
        this.state={
            machineWiseRootCauseCountData:[],
            currentPage:1, totalPages:1, pageSize:10,recordCount:1,
            division:'',region:'',territory:'',machineBrand:'',machineModel:'',rootCause:'',
            machineNumber:'',startDate:'',endDate:'',countStart:'',countEnd:'',
            filterBoxVisible:false
        }
        this.machineWiseRootCauseCountApi = '/api/v1/issue/report/machine_wise_root_cause_count';
    }

    buildUrl(){
        let url = this.machineWiseRootCauseCountApi+"?page="+this.state.currentPage;
        if(this.state.division.length>0) url+='&division='+this.state.division;
        if(this.state.region.length>0) url+='&region='+this.state.region;
        if(this.state.territory.length>0) url+='&territory='+this.state.territory;
        if(this.state.machineBrand.length>0) url+='&machineBrand='+this.state.machineBrand;
        if(this.state.machineModel.length>0) url+='&machineModel='+this.state.machineModel;
        if(this.state.machineNumber.length>0) url+='&machineNumber='+this.state.machineNumber;
        if(this.state.rootCause.length>0) url+='&rootCause='+this.state.rootCause;
        if(this.state.startDate.length>0) url+='&startDate='+this.state.startDate;
        if(this.state.endDate.length>0) url+='&endDate='+this.state.endDate;
        if(this.state.countStart.length>0) url+='&countStart='+this.state.countStart;
        if(this.state.countEnd.length>0) url+='&countEnd='+this.state.countEnd;
        return url;
    }

    componentDidMount() {
        Network.get(this.buildUrl()).then(data=>{
            this.setState({
                machineWiseRootCauseCountData:data['data']['dataList'],
                currentPage:data['data']['pageIndex'], totalPages:data['data']['totalPages'],
                pageSize:data['data']['pageSize'], recordCount:data['data']['recordCount']
            })
        })
    }

    fontColor={ input: { color: '#f7891b' } };

    render() {
        return <div>
            <div className='row'>
                <div className='col-lg-10'>
                    <h4>Machine Wise Root Cause Frequency</h4>
                </div>
                <div className='col-lg-2'>
                    <Button fullWidth variant="contained" endIcon={<FilterIcon />}
                            onClick={(e)=>{this.setState({filterBoxVisible:!this.state.filterBoxVisible})}}
                    >Filter
                    </Button>
                </div>
            </div>
            {
                this.state.filterBoxVisible?
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-3 p-3'>
                                <TextField label="Division" variant="standard" fullWidth
                                           onChange={(e) => {this.setState({division:e.target.value})}}
                                           value={this.state.division}/>
                            </div>
                            <div className='col-sm-3 p-3'>
                                <TextField label="Region" variant="standard" fullWidth
                                           onChange={(e) => {this.setState({region:e.target.value})}}
                                           value={this.state.region}/>
                            </div>
                            <div className='col-sm-3 p-3'>
                                <TextField label="Territory" variant="standard" fullWidth
                                           onChange={(e) => {this.setState({territory:e.target.value})}}
                                           value={this.state.territory}/>
                            </div>
                            <div className='col-sm-3 p-3'>
                                <TextField label="Machine Brand" variant="standard" fullWidth
                                           onChange={(e) => {this.setState({machineBrand:e.target.value})}}
                                           value={this.state.machineBrand}/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-3 p-3'>
                                <TextField label="Machine Model" variant="standard" fullWidth
                                           onChange={(e) => {this.setState({machineModel:e.target.value})}}
                                           value={this.state.machineModel}/>
                            </div>
                            <div className='col-sm-3 p-3'>
                                <TextField label="Machine Number" variant="standard" fullWidth
                                           onChange={(e) => {this.setState({machineNumber:e.target.value})}}
                                           value={this.state.machineNumber}/>
                            </div>
                            <div className='col-sm-3 p-3'>
                                <TextField label="Start Date" variant="standard" fullWidth
                                           InputLabelProps={{ shrink: true }}
                                           type="date" value={this.state.startDate}
                                           onChange={(e)=>{this.setState({startDate:e.target.value})}}
                                />
                            </div>
                            <div className='col-sm-3 p-3'>
                                <TextField label="End Date" variant="standard" fullWidth
                                           InputLabelProps={{ shrink: true }}
                                           type="date" value={this.state.endDate}
                                           onChange={(e)=>{this.setState({endDate:e.target.value})}}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-sm-3 p-3'>
                                <label><b>Frequency Range:</b></label>
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <TextField label="Start" variant="standard" fullWidth
                                                   type='number' value={this.state.countStart}
                                                   onChange={(e) => {this.setState({countStart:e.target.value})}}
                                        />
                                    </div>
                                    <div className='col-lg-6'>
                                        <TextField label="End" variant="standard" fullWidth
                                                   type='number' value={this.state.countEnd}
                                                   onChange={(e) => {this.setState({countEnd:e.target.value})}}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-3 p-3'>
                                <TextField label="Root Cause" variant="standard" fullWidth
                                           onChange={(e) => {this.setState({rootCause:e.target.value})}}
                                           value={this.state.rootCause}/>
                            </div>
                            <div className="col-lg-5"> </div>
                            <div className="col-lg-1 p-3">
                                <Button  onClick={(e)=>{
                                    this.setState({currentPage:1},()=>{
                                        this.componentDidMount();
                                    });}}
                                         variant="contained" endIcon={<SearchIcon />}> </Button>
                            </div>
                        </div>
                    </div>
                    :''
            }

            <div className="row">
                <div className="col-lg-3 my-auto p-3">
                    <label><b>
                        Showing {(this.state.currentPage-1)*this.state.pageSize+1}&nbsp;-&nbsp;
                        {(this.state.currentPage-1)*this.state.pageSize+this.state.machineWiseRootCauseCountData.length}
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
            <div className="row" style={{overflowY:'auto',maxHeight:'550px'}}>
                <table style={{verticalAlign:'middle'}} className = "table table-striped table-bordered">
                    <thead className= "text-center text-nowrap" style={{background:'#e6f7ee',position:'sticky',top:0,zIndex:1}}>
                    <tr>
                        <th>SL</th>
                        <th className='col-md-4'>Location</th>
                        <th className='col-md-3'>Machine</th>
                        <th className='col-md-4'>Root Cause</th>
                        <th>Count</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.machineWiseRootCauseCountData.map((row,idx)=>
                            <tr onClick={()=>{
                                sessionStorage.setItem('machineNumber',row['machineNumber']);
                                window.location.pathname='/tickets';}}
                            >
                                <td>{idx+1}</td>
                                <td> {row['division']+'>'+row['region']+'>'+row['territory']} </td>
                                <td> {row['machineBrand']+'-'+row['machineModel']+'-'+row['machineNumber']} </td>
                                <td> {row['rootCause']} </td>
                                <td> {row['count']} </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>

        </div>
    }
}