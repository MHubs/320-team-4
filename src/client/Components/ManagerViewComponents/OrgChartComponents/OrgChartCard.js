import React from 'react';
import {Button, Card, CardBody, CardHeader} from 'reactstrap';
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
      <div style={this.props.invisible ? {opacity: 0, position: "inherit", height: "5%"} : {opacity: 100, position: "relative", height: "100%"}}>
        <Card style={{width:"100%", height:"100%"}}>
          <CardBody className="text-center">
            <CardHeader tag="h5"> View Org Chart </CardHeader>
            <CardBody> View Where Yourself and Coworkers Stand in Your Company </CardBody>
            <Button style={{position: "absolute", left: "10%", height: "15%", width: "80%", bottom: "10px"}} onClick={this.togglePopup.bind(this)}> View Chart </Button>
         </CardBody>
        </Card>
        {this.state.showPopup ?
            <OrgChart
                text='Close Me'
                closePopup={this.togglePopup.bind(this)}
                compID= {this.props.compID}
            />
            : null
        }
        </div>
        )
    }
}
