import axios from 'axios'
import React, {Component} from 'react';
import {Button, Card, CardBody, CardHeader} from 'reactstrap';
import EditJobPostingPopup from './EditJobPostingPopup';
import {ip} from "../../LandingPageComponents/JobView";

//Card Components in the Manage Job Postings View
class ManageableJobPostingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      id: ""
    };
this.deleteJobPosting = this.deleteJobPosting.bind(this);
  }


  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }


  getJobs = async () => {
    let res = await axios.get('http://' + ip + ':3001/getData');
    let {data} = await res.data;
    this.props.setJobs(data.reverse().filter(job => job.companyId == this.props.compID && job.managerId == this.props.empID));
  };

  deleteJobPosting = (event) =>{
    event.preventDefault();
    console.log(this.state.id, this.props.job._id);
    this.setState({id: this.props.job._id}, () => {
      axios.post('http://'+ip+':3001/deleteJobPosting', this.state);
      this.getJobs();
    });

}

  render() {
    return (
        <div style={this.props.invisible ? {opacity: 0, position: "inherit", height: "5%"} : {opacity: 100, position: "relative", height: "100%"}}>
          <Card className="card" style={{position: "inherit", height: "100%"}}>
            <CardBody className="text-center" style={{position: "inherit", height: "100%"}}>
              <CardHeader tag="h5" style={{position: "relative", height: "20%", width: "100%"}}> <p className="horizontal-center vertical-center"> {!this.props.invisible ? this.props.job.title : ""} </p></CardHeader>
              {/*<CardSubtitle> {this.props.location} </CardSubtitle>*/}
              <CardBody style={{position: "relative", height: "60%", width: "100%", top: "0%", overflowY: "auto"}}>{!this.props.invisible ? this.props.job.description : ""} </CardBody>
              <Button style={{position: "absolute", left: "10%", height: "15%", width: "35%", bottom: "10px"}} onClick={this.togglePopup.bind(this)}> Edit </Button>
              <Button style={{position: "absolute", left: "55%", height: "15%", width: "35%", bottom: "10px"}} onClick={this.deleteJobPosting}>Delete</Button>
            </CardBody>
          </Card>
          {this.state.showPopup ?
              <EditJobPostingPopup
              job = {this.props.job}
              title = {this.props.title}
              description = {this.props.description}
                  closePopup={this.togglePopup.bind(this)}
              setJobs={this.props.setJobs}
              compID={this.props.compID}
              empID={this.props.empID}
              />
              : null
          }
        </div>

    )
  }
}

export default ManageableJobPostingCard;
