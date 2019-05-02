import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PostJobCard from "./PostJobComponents/PostJobCard";
import OrgChartCard from "./OrgChartComponents/OrgChartCard";
import ViewApplicantsCard from "./ViewApplicantsComponents/ViewApplicantsCard";
import ManPostingsCard from "./ManageJobPostingsComponent/ManPostingsCard";
import JobPostingPopup from './PostJobComponents/PostJobPopup';
import RecentPostings from "./RecentPostings";

class ManagerDash extends Component {

  render () {
    return (
      <Container fluid>
        <div className="row justify-content-center">
          <Col sm="12" md={{size: 6, offset: 1}}>
            <Row>
              <Col> <OrgChartCard /> </Col>
              <Col> <ViewApplicantsCard /> </Col>
            </Row>
            <br></br>
            <Row>
              <Col> <ManPostingsCard /> </Col>
              <Col> <PostJobCard /> </Col>
            </Row>
          </Col>
        </div>
      </Container>
    )

  }
}

export default ManagerDash;
