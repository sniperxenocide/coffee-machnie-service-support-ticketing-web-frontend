import React, {Component, useState} from 'react';
import Network from "../utils/network";
import TextField from "@mui/material/TextField";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Button from "@mui/material/Button";
import BarChartIcon from '@mui/icons-material/BarChart';

import * as WebDataRocksReact from 'react-webdatarocks';
import 'webdatarocks/webdatarocks.css';
import 'webdatarocks/theme/orange/webdatarocks.min.css';
import PivotChart from "../components/PivotChart";
import DialogActions from "@mui/material/DialogActions";
import {Dialog, DialogContent} from "@mui/material";
import CommonMethods from "../utils/CommonMethods";

export default class TicketCountReport extends Component{
    pivotTableRef=null;

    constructor(props) {
        super(props);
        this.pivotTableRef = React.createRef;
        this.state = {
            ticketCountReportData:[],
            startDate:'',endDate:'',
            chartDialogOpen:false,chartRows:[],chartCols:[],chartVals:[]
        }
        this.ticketCountApi = '/api/v1/issue/report/ticket_count';
    }

    buildUrl(){
        let url = this.ticketCountApi+'?';
        if(this.state.startDate.length>0) url+='startDate='+this.state.startDate+'&';
        if(this.state.endDate.length>0) url+='endDate='+this.state.endDate;
        return url;
    }

    componentDidMount() {
        Network.get(this.buildUrl()).then(data=>{
            this.setState({
                    ticketCountReportData:CommonMethods.objectKeyToCamelCaseToWord(data['data'])},
                ()=>{
                    this.pivotTableRef.webdatarocks.setReport(this.getReport());
                });
            console.log(this.pivotTableRef.webdatarocks);
        })
    }

    getReport(){
        return {
            'dataSource': {
                'data': this.state.ticketCountReportData
            },
            'slice':{
                'rows':[
                    {
                        'uniqueName':'Division',
                        'sort':'asc'
                    },
                    {
                        'uniqueName':'Region',
                        'sort':'asc'
                    }
                ],
                'columns':[
                    {
                        'uniqueName':'Status Group',
                        'sort':'asc'
                    },
                    {
                        'uniqueName':'Status',
                        'sort':'asc'
                    }
                ],
                'measures':[
                    {
                        'uniqueName':'Ticket Count',
                        'sort':'sum'
                    }
                ]
            }
        }
    };

    onChartOpen(){
        let newRows=[],newCols=[],newVals=[];
        this.pivotTableRef.webdatarocks.getRows().forEach(r=>{
            newRows.push(r.uniqueName);
        });
        this.pivotTableRef.webdatarocks.getColumns().forEach(c=>{
            if(c.uniqueName!=='Measures')newCols.push(c.uniqueName);
        });
        newVals.push(this.pivotTableRef.webdatarocks.getMeasures()[0]['name']);
        this.setState({chartDialogOpen:true,chartRows:newRows,chartCols:newCols,chartVals:newVals})
    }

    render() {
        return <div>
            <div className='container'>
                <div className="row">
                    <div className="col-lg-2 p-3">
                        <Button  onClick={(e)=>this.onChartOpen()}
                                 variant="contained" endIcon={<BarChartIcon />}>Chart</Button>
                    </div>
                    <div className="col-lg-5 p-3 text-center"><h4> </h4> </div>
                    <div className="col-lg-2 p-3">
                        <TextField label="Start Date" variant="standard" fullWidth
                                   InputLabelProps={{ shrink: true }}
                                   type="date" value={this.state.startDate}
                                   onChange={(e)=>{this.setState({startDate:e.target.value})}}
                        />
                    </div>
                    <div className="col-lg-2 p-3">
                        <TextField label="End Date" variant="standard"
                                   type="date" InputLabelProps={{ shrink: true }}
                                   value={this.state.endDate}
                                   onChange={(e)=>{this.setState({endDate:e.target.value})}}
                        />
                    </div>
                    <div className="col-lg-1 p-3">
                        <Button fullWidth onClick={(e)=>{this.setState({dataLoaded:false},()=>this.componentDidMount())}}
                                variant="contained" endIcon={<ArrowCircleRightIcon />}> </Button>
                    </div>
                </div>
                <div className="row">
                    <WebDataRocksReact.Pivot
                        ref={(e)=>{this.pivotTableRef=e}}
                        toolbar={true}
                        height='600'
                        width="100%"
                        // report="https://cdn.webdatarocks.com/reports/report.json"
                        report={{}}
                    />
                </div>
            </div>
            <Dialog
                open={this.state.chartDialogOpen}
                onClose={()=>{this.setState({chartDialogOpen:false})}}
                scroll='paper' fullWidth={true} maxWidth='lg'
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description">
                {/*<DialogTitle textAlign='center'>Chart</DialogTitle>*/}
                <DialogContent dividers={true}>
                    <PivotChart reportData={this.state.ticketCountReportData}
                                rows={this.state.chartRows}
                                cols={this.state.chartCols}
                                vals={this.state.chartVals}
                    />
                </DialogContent>
                <DialogActions><Button onClick={()=>{this.setState({chartDialogOpen:false})}}>Close</Button></DialogActions>
            </Dialog>
        </div>
    }
}