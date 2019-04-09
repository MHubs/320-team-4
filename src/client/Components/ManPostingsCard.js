import React, { Component } from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class ManPostingsCard extends React.Component {

  render() {
    return (
      <div>
        <Card style={{width:"100%", height:"60%"}}>
          <CardBody className="text-center">
            <CardHeader tag="h5"> Manage Job Postings </CardHeader>
            <CardBody> Card Body: Text about card goes here </CardBody>
            <Button class="btn"> Button </Button>
          </CardBody>
        </Card>
      </div>
    )
  }
}
