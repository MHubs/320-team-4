import React, { Component } from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import JobPostingPopup from '../Components/JobPostingPopup';

class PostJobCard extends Component {
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
        <Card>
          <CardBody className="text-center">
            <CardHeader tag="h5"> Post a Job</CardHeader>
            <CardBody> Card Body: Text about card goes here </CardBody>
            <Button class="btn" onClick={this.togglePopup.bind(this)}> Button </Button>
          </CardBody>
        </Card>
        {this.state.showPopup ?
          <JobPostingPopup
            text='Close Me'
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
      </div>
    )
  }
}

export default PostJobCard;
