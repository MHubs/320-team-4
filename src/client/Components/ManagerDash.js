import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PostJobCard from "./PostJobCard";
import OrgChartCard from "./OrgChartCard";
import CompInfoCard from "./CompInfoCard";
import ManPostingsCard from "./ManPostingsCard";
import JobPostingPopup from './PostJobPopup';
import RecentPostings from "./RecentPostings";

class ManagerDash extends Component {

  render () {
    return (
      <Container fluid>
        <Row>
          <Col xs="auto"> <RecentPostings /></Col>
          <Col sm="12" md={{size: 6, offset: 1}}>
            <Row>
              <Col> <OrgChartCard /> </Col>
              <Col> <CompInfoCard /> </Col>
            </Row>
            <br></br>
            <Row>
              <Col> <ManPostingsCard /> </Col>
              <Col> <PostJobCard /> </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )

  }
}

export default ManagerDash;
