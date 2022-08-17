import React,{Component} from "react";
import Network from "../network";
import moment from "moment";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from "@mui/icons-material/Send";
import Box from '@mui/material/Box';

class TicketDetail extends Component {
    constructor(props) {
        super(props);
        this.state={
            ticket:props.ticket,
            statusIndex:0,
            dataFields:props.ticket['nextStatusList'].length>0?props.ticket['nextStatusList'][0]['dataFields']:[]
        }
    }

    render() {
        let ticket = this.state.ticket;
        return(
          <div>
              <div className="row">
                  <table style={{verticalAlign:'middle'}} className = "table table-striped table-bordered">
                      <colgroup>
                          <col style={{border:'1.1px solid #f5b453'}} span={2}/>
                          <col style={{border:'1.1px solid #889df2'}} span={1}/>
                          <col style={{border:'1.1px solid #95baa6'}} span={1}/>
                      </colgroup>
                      <thead className= "text-center text-nowrap" >
                          <tr >
                              <th className="col-lg-6" style={{background:'#f5b453'}}> Shop</th>
                              <th className="col-lg-2" style={{background:'#f5b453'}}> Machine</th>
                              <th className="col-lg-2" style={{background:'#889df2'}}> Ticket</th>
                              <th className="col-lg-2" style={{background:'#95baa6'}}> MSO</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td>
                                  <div className="row">
                                      <div className="col-lg-3"><label><b>Name:</b></label> </div>
                                      <div className="col-lg-9"><label>{ticket['shopName']}</label> </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-lg-3"><label><b>MIS Code:</b></label> </div>
                                      <div className="col-lg-9"><label>{ticket['shopMisCode']}</label> </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-lg-3"><label><b>Owner:</b></label> </div>
                                      <div className="col-lg-9"><label>{ticket['shopOwner']}</label> </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-lg-3"><label><b>Phone:</b></label> </div>
                                      <div className="col-lg-9"><label>{ticket['shopPhone']}</label> </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-lg-3"><label><b>Division:</b></label> </div>
                                      <div className="col-lg-9"><label>{ticket['division']}</label> </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-lg-3"><label><b>Region:</b></label> </div>
                                      <div className="col-lg-9"><label>{ticket['region']}</label> </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-lg-3"><label><b>Territory:</b></label> </div>
                                      <div className="col-lg-9"><label>{ticket['territory']}</label> </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-lg-3"><label><b>Address:</b></label> </div>
                                      <div className="col-lg-9"><label>{ticket['shopAddress']}</label> </div>
                                  </div>
                              </td>
                              <td>
                                  <div className="row"><label><b>Brand: </b>{ticket['machineBrand']}</label></div>
                                  <div className="row"><label><b>Model: </b>{ticket['machineModel']}</label></div>
                                  <div className="row"><label><b>Serial: </b>{ticket['machineNumber']}</label></div>
                              </td>
                              <td className="text-nowrap">
                                  <div className="row"><label><b>Ticket Number:</b></label></div>
                                  <div className="row"><label>{ ticket['issueToken']+' ('+ticket['issueType']+')'}</label></div>
                                  <div className="row"><label><b>Current Status:</b></label></div>
                                  <div className="row"><label>{ ticket['currentStatus']['name']}</label></div>
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
                                  <div className="row"><label><b>Name: </b>{ ticket['currentMsoName']}</label></div>
                                  <div className="row"><label><b>Phone: </b>{ ticket['currentMsoPhone']}</label></div>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              {
                  ticket['nextStatusList'].length>0?
                      <Box sx={{ border:'1px solid grey',borderRadius:'5px',margin:'10px 0px',padding:'10px' }}><div>
                          <div className="row"><label><b>Next Status</b></label></div>
                          <div className="row">
                              <div className="col-lg-3 p-3">
                                  <TextField
                                      id="select-status"
                                      select fullWidth label="Status"
                                      value={this.state.statusIndex}
                                      onChange={(e) => {this.setState({statusIndex:e.target.value,
                                          dataFields:ticket['nextStatusList'][e.target.value]['dataFields']})}}
                                      variant="standard" SelectProps={{native: true,}}
                                  >
                                      {this.state.ticket['nextStatusList'].map((s,idx) => (
                                          <option key={s.id} value={idx}>
                                              {s.name}
                                          </option>
                                      ))}
                                  </TextField>
                              </div>
                              <div className="col-lg-1 p-3"> </div>
                              <div className="col-lg-4 p-3">
                                  {
                                      this.state.dataFields.map(
                                          (df,idx)=>
                                              <div className="row" key={df.id}>
                                                  <TextField id="status_data" label={df['name']} variant="standard" fullWidth
                                                             // onChange={(e) => {this.setState({statusData:e.target.value})}}
                                                             // value={this.state.ticketNumber}
                                                  />
                                              </div>
                                      )
                                  }
                              </div>
                              <div className="col-lg-1 p-3"> </div>
                              <div className="col-lg-2 p-3">
                                  <Button fullWidth onClick={(e)=>{
                                      // this.setState({currentPage:1},()=>{
                                      //     this.componentDidMount();
                                      // });
                                  }} variant="contained" endIcon={<SendIcon />}>
                                      Submit
                                  </Button>
                              </div>
                          </div>
                      </div></Box> :''
              }

              <div className="row"><label><b>Ticket History</b></label></div>
              <div className="row">
                  <table style={{verticalAlign:'middle'}} className = "table table-striped table-bordered">
                      <thead className= "text-center text-nowrap" >
                          <tr style={{background:'#889df2'}} >
                              <th> Sequence</th>
                              <th className="col-lg-3" > Status</th>
                              <th className="col-lg-2" > MSO</th>
                              <th className="col-lg-3" > Created By</th>
                              <th className="col-lg-4" > Data</th>
                          </tr>
                      </thead>
                      <tbody>
                      {
                          ticket['issueHistory'].map(
                              (th)=>
                                  <tr key={th.sequence}>
                                      <td>{th['sequence']}</td>
                                      <td>{th['status']}</td>
                                      <td>
                                          <div className="row"><label><b>Name: </b>{ th['msoName']}</label></div>
                                          <div className="row"><label><b>Phone: </b>{ th['msoPhone']}</label></div>
                                      </td>
                                      <td>
                                          <div className="row"><label><b>Username: </b>{ th['createdByUsername']}</label></div>
                                          <div className="row"><label><b>User Type: </b>{ th['createdByType']}</label></div>
                                          <div className="row"><label><b>Name: </b>{ th['createdByName']}</label></div>
                                          <div className="row"><label><b>Phone: </b>{ th['createdByPhone']}</label></div>
                                          <div className="row"><label><b>Time: </b>{ moment(th['creationTime']).format('D-MMM-YYYY h:mm a')}</label></div>
                                      </td>
                                      <td>{
                                          th['statusData'].map(
                                              (sd)=>
                                                  <div key={sd.id}>
                                                      <div className="row"><label><b>{sd['fieldName']+': '}</b></label></div>
                                                      <div className="row"><label>{sd['fieldData']+ ((sd['fieldData2']==null || sd['fieldData2'].length===0)?'':(' Qty: '+sd['fieldData2']))}</label></div>
                                                  </div>
                                          )
                                      }</td>
                                  </tr>
                          )
                      }
                      </tbody>
                  </table>
              </div>
          </div>
        );
    }
}

export default TicketDetail