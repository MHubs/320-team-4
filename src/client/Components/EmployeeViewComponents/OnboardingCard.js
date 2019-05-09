import React, {Component} from 'react';
import {Button, Card, CardBody, CardHeader} from 'reactstrap';
import OnboardingPopup from "./OnboardingPopup";
import axios from "axios";
import {ip} from "../LandingPageComponents/JobView";

export default class OnboardingCard extends Component {

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
                            <CardHeader tag="h5"> On-boarding Info </CardHeader>
                            <CardBody> {this.state.employee.onBoarding ? "URGENT! You have onboarding information to submit!" : this.state.employee.customFields !== undefined ? this.state.employee.customFields.length === 0 ? "You have no onboarding information" : "You can edit your onboarding information" : "You have no onboarding information"} </CardBody>
                            {
                                this.state.employee.customFields !== undefined ? this.state.employee.customFields.length === 0 ?
                                    <Button disabled style={{
                                        position: "absolute",
                                        left: "10%",
                                        height: "15%",
                                        width: "80%",
                                        bottom: "10px"
                                    }} onClick={this.togglePopup.bind(this)}> Fill it out </Button>
                                    :
                                    <Button style={{
                                        position: "absolute",
                                        left: "10%",
                                        height: "15%",
                                        width: "80%",
                                        bottom: "10px"
                                    }} onClick={this.togglePopup.bind(this)}> Fill it out </Button> :
                                    <Button disabled style={{
                                    position: "absolute",
                                    left: "10%",
                                    height: "15%",
                                    width: "80%",
                                    bottom: "10px"
                                }} onClick={this.togglePopup.bind(this)}> Fill it out </Button>
                            }
                        </CardBody>
                    </Card>
                    {this.state.showPopup ?
                        <OnboardingPopup employee={this.state.employee}
                                         closePopup={this.togglePopup.bind(this)}
                                         empID={this.props.empID}
                                         compID={this.props.compID}
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
                            <CardHeader tag="h5"> On-boarding Info </CardHeader>
                            <CardBody> {"Loading"} </CardBody>


                                    <Button disabled style={{
                                        position: "absolute",
                                        left: "10%",
                                        height: "15%",
                                        width: "80%",
                                        bottom: "10px"
                                    }}> Loading... </Button>


                        </CardBody>
                    </Card>
                </div>
            )
        }
    }
}
