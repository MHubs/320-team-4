import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import OrgChartCard from "../ManagerViewComponents/OrgChartComponents/OrgChartCard";
import OnboardingCard from "./OnboardingCard";


class EmployeeDash extends Component {

    constructor(props) {
        super(props);
    }


    render () {
        return (
            <Container fluid>
                <Row>
                    <Col sm="12" md={{size: 6, offset: 1}}>
                        <Row>
                            <Col> <OrgChartCard /> </Col>
                            <Col> <OnboardingCard employee={this.props.employee} /> </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>
        )

    }
}

export default EmployeeDash;
