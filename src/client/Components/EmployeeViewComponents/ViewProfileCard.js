import React, { Component } from 'react';
import {
  Card, CardImg, CardHeader, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import ProfilePopup from '../EmployeeViewComponents/ProfilePopup';

class ViewProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      employee: {
        "firstName": "Lanette",
        "lastName": "Holmgren",
        "employeeId": 1,
        "email": "Lanette_Holmgren@cloverenterprises.com",
        "companyId": 2,
        "companyName": "Clover Enterprises",
        "positionTitle": "CEO",
        "startDate": "2005-10-11"
      }

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
        <Card style={{ width: "100%", height: "60%" }}>
          <CardBody className="text-center">
            <CardHeader tag="h5"> View Profile</CardHeader>
            <CardBody> Card Body: Text about card goes here </CardBody>
            <Button class="btn" onClick={this.togglePopup.bind(this)}> View </Button>
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
  }
}

export default ViewProfileCard;
