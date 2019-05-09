import React, {Component} from 'react';
import {Container, Row, Col} from "reactstrap";
import OrgChartCard from "../ManagerViewComponents/OrgChartComponents/OrgChartCard";
import OnboardingCard from "./OnboardingCard";
import ViewProfileCard from "./ViewProfileCard";


class EmployeeDash extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Container>
                        <Row>
                            <div className="mcard1"> <OrgChartCard empID= {this.props.empID} compID= {this.props.compID}/> </div>
                            <div className="mcard2"> <OnboardingCard empID= {this.props.empID} compID= {this.props.compID} /> </div>
                            <br/>
                            <div className="mcard3"> <ViewProfileCard empID= {this.props.empID} compID= {this.props.compID} /> </div>
                        </Row>

            </Container>
        )

    }
}

export default EmployeeDash;
