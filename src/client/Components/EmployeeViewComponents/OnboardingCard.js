import React, { Component } from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import OnboardingPopup from "./OnboardingPopup";

export default class OnboardingCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            showPopup: false
        };

    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render() {
        return (
            <div>
                <Card style={{width:"100%", height:"60%"}}>
                    <CardBody className="text-center">
                        <CardHeader tag="h5"> On-boarding Info </CardHeader>
                        <CardBody> Fill out more stuff out you! </CardBody>
                        <Button onClick={this.togglePopup.bind(this)}> Fill it out </Button>
                    </CardBody>
                </Card>
                {this.state.showPopup ?
                    <OnboardingPopup
                        closePopup={this.togglePopup.bind(this)}
                    />
                    : null
                }
            </div>
        )
    }
}