import React, {Component, useState} from 'react';
import Network from "../network";

import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plot from 'react-plotly.js';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import TextField from "@mui/material/TextField";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Button from "@mui/material/Button";

import * as WebDataRocksReact from 'react-webdatarocks';
import 'webdatarocks/webdatarocks.css';

const PlotlyRenderers = createPlotlyRenderers(Plot);

export default class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            statusList:[],statusTagList:[],ticketCountReportData:[],
            totalTickets:0,openTickets:0,closedTickets:0,
            startDate:'',endDate:'',dataLoaded:false
        }
        this.dashboardApi='/api/v1/web/dashboard';
        this.ticketCountApi = '/api/v1/issue/report/ticket_count';
    }

    camelCaseToText(val){
        let result = val.replace( /([A-Z])/g, " $1" );
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    buildUrl(){
        let url = this.ticketCountApi+'?';
        if(this.state.startDate.length>0) url+='startDate='+this.state.startDate+'&';
        if(this.state.endDate.length>0) url+='endDate='+this.state.endDate;
        return url;
    }

    componentDidMount() {
        Network.get(this.buildUrl()).then(data=>{
            let tmpData = data['data'];
            let tmpFinal = [];
            tmpData.forEach(d=>{
                let obj = {}
                for(let key in d){
                    obj[this.camelCaseToText(key)]=d[key];
                }
                tmpFinal.push(obj);
            })
            this.setState({ticketCountReportData:tmpFinal,dataLoaded:true});
        })

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

    getReport(){
        return {
            dataSource:
                {
                    data: this.state.ticketCountReportData
                }
        };
    }

    render() {
        return(
            <div>
                <label> </label>
                {/*className="text-center"*/}
                <h2 style={{color:'#5291f7'}} >Business Performance At-A-Glance</h2>
                <label> </label>
                <div className='container'>
                    <div className="row">
                        <div className="col-lg-7 p-3"> </div>
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
                        <PivotTableUI
                            data={this.state.ticketCountReportData}
                            rows={['Division']}
                            cols={['Status Group','Status']}
                            vals={['Ticket Count']}
                            aggregatorName="Integer Sum"
                            onChange={s => this.setState(s)}
                            rendererName="Table Heatmap"
                            renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                            {...this.state}
                        />
                    </div>
                    <label> </label>
                    <div className="row">
                        {
                            this.state.dataLoaded?
                                <WebDataRocksReact.Pivot
                                    toolbar={true}
                                    width="100%"
                                    // report="https://cdn.webdatarocks.com/reports/report.json"
                                    report={this.getReport()}
                                />:''
                        }
                    </div>

                </div>
                {/*<div className='container'>*/}
                {/*    <div className="row">*/}
                {/*        <div className="col-lg-6" >*/}
                {/*            <div className="row" style={{fontSize:18}}>*/}
                {/*                <div className="row">*/}
                {/*                    <div className="col-lg-3"> </div>*/}
                {/*                    <div className="col-lg-9"><label><b>Total Tickets: </b></label>&nbsp;&nbsp;&nbsp;*/}
                {/*                        <label>{this.state.totalTickets}</label></div>*/}
                {/*                </div>*/}
                {/*                <div className="row">*/}
                {/*                    <div className="col-lg-3"> </div>*/}
                {/*                    <div className="col-lg-9"><label><b>Open Tickets: </b></label>&nbsp;&nbsp;*/}
                {/*                        <label>{this.state.openTickets}</label></div>*/}
                {/*                </div>*/}
                {/*                <div className="row">*/}
                {/*                    <div className="col-lg-3"> </div>*/}
                {/*                    <div className="col-lg-9"><label><b>Closed Tickets: </b></label>&nbsp;*/}
                {/*                        <label>{this.state.closedTickets}</label> </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="row"><Chart*/}
                {/*                chartType="PieChart"*/}
                {/*                data={[*/}
                {/*                    ["Status", "Ticket Count"],...*/}
                {/*                        this.state.statusTagList.map(st=>*/}
                {/*                            st['statusTag']!=='END'?*/}
                {/*                                [st['tagDescription']+' ('+st['ticketCount']+')',st['ticketCount']]*/}
                {/*                                : ["",0])*/}
                {/*                ]}*/}
                {/*                options={{*/}
                {/*                    titleTextStyle: {*/}
                {/*                        color: "black",*/}
                {/*                        fontName: 'Times New Roman', // i.e. 'Times New Roman'*/}
                {/*                        fontSize: 20,*/}
                {/*                        bold: true,    // true or false*/}
                {/*                        italic: true  // true of false*/}
                {/*                    },*/}
                {/*                    title: "Status Wise Ticket Summary",*/}
                {/*                    is3D: true,*/}
                {/*                }}*/}
                {/*                width={"100%"}*/}
                {/*                height={"600px"}*/}
                {/*            /></div>*/}

                {/*        </div>*/}
                {/*        <div className="col-lg-6" >*/}
                {/*            <label className="col-form-label"><b>Status Wise Ticket Count</b></label>*/}
                {/*            <div style={{overflowY:'auto',maxHeight:'500px'}} className = "row" >*/}
                {/*                <table style={{verticalAlign:'middle'}} className = "table table-striped table-bordered">*/}
                {/*                    <thead className= "text-center text-nowrap" style={{background:'#e6f7ee',position:'sticky',top:0,zIndex:1}}>*/}
                {/*                    <tr >*/}
                {/*                        <th> SL</th><th className="col-lg-5"> Status Group</th>*/}
                {/*                        <th className="col-lg-6"> Status</th>*/}
                {/*                        <th className="col-lg-1"> Ticket Count</th>*/}
                {/*                    </tr>*/}
                {/*                    </thead>*/}
                {/*                    <tbody>*/}
                {/*                    {*/}
                {/*                        this.state.statusList.map(*/}
                {/*                            (s,idx)=>*/}
                {/*                                <tr key={s.id}>*/}
                {/*                                    <td>{idx+1}</td>*/}
                {/*                                    <td>{s['tagDescription']}</td>*/}
                {/*                                    <td>{s['status']}</td>*/}
                {/*                                    <td>{s['ticketCount']}</td>*/}
                {/*                                </tr>*/}
                {/*                        )*/}
                {/*                    }*/}
                {/*                    </tbody>*/}
                {/*                </table>*/}

                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        )
    }
}