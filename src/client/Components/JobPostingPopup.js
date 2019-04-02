import React, {Component} from 'react';
import axios from 'axios'



class JobPostingPopup extends Component{
  constructor(props){
      super(props);
      this.state = {
          postingID: Math.floor(Math.random()*100),
          managerID: 22,
          jobTitle: '',
          jobDescription: '',
          companyID: 1,
          postingDate:  new Date().toJSON().slice(0,10).replace(/-/g,'/'),
          showPopup: false,
          startDate: null,
          expirationDate: null,
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.togglePopup = this.togglePopup.bind(this);

  }

//Method to toggle popup window..
  togglePopup() {
    console.log("TOGGLE")
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

//Method for action after hitting the submit button
    handleSubmit = (event) => {
        event.preventDefault();
        let form = document.forms.postingInfo;
        console.log(form.jobTitle.value)
        //format data according to data dump
        //NOTE: data dump doesn't include posting ID. I'm wondering if we need it or if we'll always query by manager id and position title
        //for example, an employee wouldn't apply for a posting. They'd apply to a title. Then positions would be filled as they're filled
        this.setState({
          jobTitle: form.jobTitle.value,
          jobDescription: form.jobDescription.value,
          startDate: form.startDate.value,
          expirationDate: form.expirationDate.value,
      },() => { //callback param ensures that setstate occurs before post
        //push data via backend
        console.log('POST')
        axios.post('http://13.59.24.130:3001/putData', this.state)
        this.props.closePopup()
      });
      //document.getElementById("posting-form").reset();

      }


  render(){

      return(
        //Form elements with labels and inputs for job title and job description
        <div>
      return (
      <div className='popup'>
        <div className='popup_inner'>
        <form name="postingInfo" onSubmit={this.handleSubmit} id="posting-form">
          <div className="header">Post a Job</div>
            <div className="form-group">
              <input type="text" name="jobTitle" placeholder="Job Title" value ={this.state.text}/>
              <input type="text" name="jobDescription" placeholder="Job Description" value ={this.state.text}/>
              <br></br>
              <label>Posting Date</label>
              <input type="date" name="startDate" placeholder="Start Date" value ={this.state.startDate}/>
              <br></br>
              <label>Posting Date</label>
              <input type="date" name="expirationDate" placeholder="Expiration Date" value ={this.state.expirationDate}/>
              <input type="submit" value="Submit Job Posting" />
              <button id ="closeButton" onClick={this.props.closePopup}>Close</button>
            </div>
          </form>
        </div>
      </div>
    );
    </div>

  );
  }




}

class Popup extends React.Component {

  render() {

    return (
      <div className='popup'>
        <div className='popup_inner'>
        <h1>Posting Preview</h1>
          <h2>{this.props.jobTitle}</h2>
          <h4><b>Posting ID: </b> {this.props.postingID}</h4>
          <h4><b>Date Posted: </b>{this.props.postingDate}</h4>
          <h4><b>Posted by Manager:</b> {this.props.managerID}</h4>
          <h3>{this.props.jobDescription}</h3>
          <button id ="closeButton" onClick={this.props.closePopup}>Done</button>
        </div>
      </div>
    );
  }
}


export default JobPostingPopup;
