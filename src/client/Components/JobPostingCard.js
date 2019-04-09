import React, { Component } from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import JobPostingPopup from '../Components/JobPostingPopup';

class JobPostingCard extends Component {
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
        <div style={this.props.invisible ? {opacity: 0} : {opacity: 100}}>
          <Card style={{width:"100%", height:"60%"}}>
            <CardBody className="text-center">
              <CardHeader tag="h5"> {this.props.title}</CardHeader>
              <CardSubtitle> {this.props.location} </CardSubtitle>
              <CardBody>{this.props.description} </CardBody>
              <Button class="btn" onClick={this.togglePopup.bind(this)}> Apply </Button>
            </CardBody>
          </Card>
          {this.state.showPopup ?
              <JobPostingPopup
                  closePopup={this.togglePopup.bind(this)}
              />
              : null
          }
        </div>

    )
  }
}

export default JobPostingCard;