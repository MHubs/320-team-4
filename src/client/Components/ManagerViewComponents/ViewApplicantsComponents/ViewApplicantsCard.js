import React, { Component } from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
  import { Link } from 'react-router-dom';

export default class ViewApplicantsCard extends React.Component {

  render() {
    return (
      <div>
        <Card style={{width:"100%", height:"60%"}}>
          <CardBody className="text-center">
            <CardHeader tag="h5"> View Applicants </CardHeader>
            <CardBody> Card Body: Text about card goes here </CardBody>
            <Link to="/ViewApplicantsView">
            <Button class="btn"> View Applicants </Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    )
  }
}
