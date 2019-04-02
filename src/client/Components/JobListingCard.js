import React, { Component } from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

 export default class JobListingCard extends React.Component {

  render() {
    return (
      <div>
        <Card>
          <CardBody className="text-center">
            <CardHeader tag="h5"> Job Title 1</CardHeader>
            <CardSubtitle>Company      Location</CardSubtitle>
            <CardBody> Card Body: Job Description Here </CardBody>
            <Button class="btn" onClick={this.togglePopup.bind(this)}> Apply </Button>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default JobListingCard;
}