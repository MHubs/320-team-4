import React, { Component } from 'react';
import { Card, CardHeader, CardBody,
  Button } from 'reactstrap';
import JobPostingPopup from './JobPostingPopup';
import CardSubtitle from "reactstrap/es/CardSubtitle";

class JobPostingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false
    };

  }


  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }


  render() {
    return (
        <div style={this.props.invisible ? {opacity: 0, position: "inherit", height: "5%"} : {opacity: 100, position: "relative", height: "100%"}}>
          <Card className="card" style={{position: "inherit", height: "100%"}}>
            <CardBody className="" style={{position: "inherit", height: "100%"}}>
              <CardHeader tag="h5" style={{position: "relative", height: "20%", width: "100%"}}> <p className="horizontal-center vertical-center">{this.props.title}</p></CardHeader>
              <CardSubtitle className="horizontal-center" style={{position: "relative", height: "10%", width: "100%", top: "10px", overflowY: "auto"}}> <u>{this.props.company}</u> </CardSubtitle>
              <CardBody className="horizontal-center" style={{position: "relative", height: "50%", width: "100%", top: "10px", overflowY: "auto"}}>{this.props.description} </CardBody>
              <Button style={{position: "absolute", left: "10%", height: "15%", width: "80%", bottom: "10px"}} onClick={this.togglePopup.bind(this)}> <p id={this.props.title}> Apply </p></Button>
            </CardBody>
          </Card>
          {this.state.showPopup ?
              <JobPostingPopup
                  closePopup={this.togglePopup.bind(this)}
                  job={this.props.job}
              />
              : null
          }
        </div>

    )
  }
}

export default JobPostingCard;