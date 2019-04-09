import React, {Component} from 'react';
import axios from 'axios'



class JobPostingPopup extends Component{
  constructor(props){
      super(props);
      this.state = {
          fname: '',
          lname: '',
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
          fname: form.fname.value,
          lname: form.lname.value,
      },() => { //callback param ensures that setstate occurs before post
        //push data via backend
        console.log('POST')
        axios.post('http://18.216.20.251:3001/putData', this.state)
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
          <div className="header">Apply For Job</div>
            <div className="form-group">
              <input type="text" name="fname" placeholder="First Name" value ={this.state.text}/>
              <input type="text" name="lname" placeholder="Last Name" value ={this.state.text}/>
              <br></br>
              <input type="submit" value="Submit Application" />
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
          <h4><b>First Name: </b> {this.props.fname}</h4>
          <h4><b>Last Name: </b>{this.props.lname}</h4>
          <button id ="closeButton" onClick={this.props.closePopup}>Done</button>
        </div>
      </div>
    );
  }
}


export default JobPostingPopup;
