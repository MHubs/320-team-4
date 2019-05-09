import React, {Component} from 'react';
import {Button, Card, CardBody, CardHeader} from 'reactstrap';
import PostJobPopup from './PostJobPopup';
import axios from "axios";
import {ip} from "../../LandingPageComponents/JobView";

class PostJobCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            companyName: null
        };

    }

    componentDidMount(){
        this.getEmployee();
    }

    getEmployee = async () => {
        let res = await axios.put('http://'+ip+':3001/getEmployeeByID',{companyID: this.props.compID, employeeID: this.props.empID});
        let {data} = await res.data;
        this.setState({companyName: data[0].companyName})
    };

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

  render() {
        if (this.state.companyName) {
            return (
                <div style={this.props.invisible ? {opacity: 0, position: "inherit", height: "5%"} : {
                    opacity: 100,
                    position: "relative",
                    height: "100%"
                }}>
                    <Card style={{width: "100%", height: "100%"}}>
                        <CardBody className="text-center">
                            <CardHeader tag="h5"> Post a Job</CardHeader>
                            <CardBody> Create a New Job Postings to Fill Positions in Your Company </CardBody>
                            <Button
                                style={{position: "absolute", left: "10%", height: "15%", width: "80%", bottom: "10px"}}
                                onClick={this.togglePopup.bind(this)}> Post New Job </Button>
                        </CardBody>
                    </Card>
                    {this.state.showPopup ?
                        <PostJobPopup
                            text='Close M'
                            closePopup={this.togglePopup.bind(this)}
                            empID={this.props.empID}
                            compID={this.props.compID}
                            companyName={this.state.companyName}
                        />
                        : null
                    }
                </div>
            )
        } else {
            return  (<div style={this.props.invisible ? {opacity: 0, position: "inherit", height: "5%"} : {
                opacity: 100,
                position: "relative",
                height: "100%"
            }}>
                <Card style={{width: "100%", height: "100%"}}>
                    <CardBody className="text-center">
                        <CardHeader tag="h5"> Post a Job</CardHeader>
                        <CardBody> Loading </CardBody>
                        <Button
                            style={{position: "absolute", left: "10%", height: "15%", width: "80%", bottom: "10px"}}
                            disabled> Loading... </Button>
                    </CardBody>
                </Card>
            </div>);
        }
  }
}

export default PostJobCard;
