import React, { Component } from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import OrgChart from "./OrgChart";

export default class OrgChartCard extends React.Component {

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
      <div>
        <Card style={{width:"100%", height:"60%"}}>
          <CardBody className="text-center">
            <CardHeader tag="h5"> View Org Chart </CardHeader>
            <CardBody> View Where Yourself and Coworkers Stand in your Company </CardBody>
            <Button className="btn" onClick={this.togglePopup.bind(this)}> View Chart </Button>
         </CardBody>
        </Card>
        {this.state.showPopup ?
            <OrgChart
                text='Close Me'
                closePopup={this.togglePopup.bind(this)}
            />
            : null
        }
        </div>
        )
  }
}
