import React, { Component } from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class CompInfoCard extends React.Component {

  render() {
    return (
      <div>
        <Card>
          <CardBody className="text-center">
            <CardHeader tag="h5"> View Company Info </CardHeader>
            <CardBody> Card Body: Text about card goes here </CardBody>
            <Button class="btn"> Button </Button>
          </CardBody>
        </Card>
      </div>
    )
  }
}
