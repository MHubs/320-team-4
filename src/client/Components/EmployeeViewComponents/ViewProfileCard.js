import React, { Component } from 'react';
import {Card, CardHeader, CardBody, Button} from 'reactstrap';
import ProfilePopup from '../EmployeeViewComponents/ProfilePopup';
import axios from "axios";
import {ip} from "../LandingPageComponents/JobView";

class ViewProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      employee: null
    };

  }

  componentDidMount(){
    this.getEmployee();
  }

  getEmployee = async () => {
    let res = await axios.put('http://'+ip+':3001/getEmployeeByID',{companyID: this.props.compID, employeeID: this.props.empID});
    let {data} = await res.data;
    this.setState({employee: data[0]})
  };

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    if (this.state.employee) {
      return (
          <div style={this.props.invisible ? {opacity: 0, position: "inherit", height: "5%"} : {
            opacity: 100,
            position: "relative",
            height: "100%"
          }}>
            <Card style={{width: "100%", height: "100%"}}>
              <CardBody className="text-center">
                <CardHeader tag="h5"> View Profile</CardHeader>
                <CardBody> Who even are you? </CardBody>
                <Button style={{
                  position: "absolute",
                  left: "10%",
                  height: "15%",
                  width: "80%",
                  bottom: "10px"
                }} onClick={this.togglePopup.bind(this)}> View </Button>
              </CardBody>
            </Card>
            {this.state.showPopup ?
                <ProfilePopup
                    id='Close Me'
                    closePopup={this.togglePopup.bind(this)}
                    employee={this.state.employee}
                />
                : null
            }
          </div>
      )
    } else {
      return (
      <div style={this.props.invisible ? {opacity: 0, position: "inherit", height: "5%"} : {
        opacity: 100,
        position: "relative",
        height: "100%"
      }}>
        <Card style={{width: "100%", height: "100%"}}>
          <CardBody className="text-center">
            <CardHeader tag="h5"> View Profile</CardHeader>
            <CardBody> Loading </CardBody>
            <Button disabled style={{
              position: "absolute",
              left: "10%",
              height: "15%",
              width: "80%",
              bottom: "10px"
            }} > Loading... </Button>
          </CardBody>
        </Card>
      </div>
      )
    }
  }
}

export default ViewProfileCard;
