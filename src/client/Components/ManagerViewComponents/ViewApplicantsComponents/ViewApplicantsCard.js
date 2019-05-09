import React from 'react';
import {Button, Card, CardBody, CardHeader} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class ViewApplicantsCard extends React.Component {

    render() {
        return (
            <div style={this.props.invisible ? {opacity: 0, position: "inherit", height: "5%"} : {opacity: 100, position: "relative", height: "100%"}}>
                <Card style={{width: "100%", height: "100%"}}>
                    <CardBody className="text-center">
                        <CardHeader tag="h5"> View Applicants </CardHeader>
                        <CardBody> Review and Select Candidates for Your Job Postings </CardBody>
                        <Link to="/ViewApplicantsView">
                            <Button style={{
                                position: "absolute",
                                left: "10%",
                                height: "15%",
                                width: "80%",
                                bottom: "10px"
                            }}> View Applicants </Button>
                        </Link>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
