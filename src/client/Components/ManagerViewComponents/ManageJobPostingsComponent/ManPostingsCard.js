import React from 'react';
import {Button, Card, CardBody, CardHeader} from 'reactstrap';
import {Link} from 'react-router-dom';


export default class ManPostingsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false
    };
  }

    render() {
        return (
            <div style={this.props.invisible ? {opacity: 0, position: "inherit", height: "5%"} : {opacity: 100, position: "relative", height: "100%"}}>
                <Card style={{width: "100%", height: "100%"}}>
                    <CardBody className="text-center">
                        <CardHeader tag="h5"> Manage Job Postings </CardHeader>
                        <CardBody> Update or Remove the Jobs You've Posted </CardBody>
                        <Link to="/ManageJobPostingsView">
                            <Button
                                style={{position: "absolute", left: "10%", height: "15%", width: "80%", bottom: "10px"}}
                                type="button">
                                Manage Job Postings
                            </Button>
                        </Link>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
