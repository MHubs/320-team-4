import React, {Component} from 'react';
import axios from 'axios'
import Input from "reactstrap/es/Input";
import Label from "reactstrap/es/Label";
import Button from "reactstrap/es/Button";


class PostJobPopup extends Component{
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
          customFields: {},
          customFieldValues: [],
          customFieldsCounter: 0
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.togglePopup = this.togglePopup.bind(this);

  }

//Method to toggle popup window..
  togglePopup() {
    console.log("TOGGLE");
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

//Method for action after hitting the submit button
    handleSubmit = (event) => {
        //event.preventDefault();
        let errorLabel = this.refs.errorLabel;
        let form = document.forms.namedItem("postingInfo");
        //format data according to data dump
        //NOTE: data dump doesn't include posting ID. I'm wondering if we need it or if we'll always query by manager id and position title
        //for example, an employee wouldn't apply for a posting. They'd apply to a title. Then positions would be filled as they're filled

        var valid = true;
        if (form.jobTitle.value.trim() === "") {
            errorLabel.className = "invalid";
            errorLabel.innerHTML = "Please enter a valid job title";
            valid = false;
        } else if (form.jobDescription.value.trim() === "") {
            errorLabel.className = "invalid";
            errorLabel.innerHTML = "Please enter a valid job description";
            valid = false;
        } else if (form.startDate.value !== "") {
            if (isNaN(new Date(form.startDate.value))) {
                errorLabel.className = "invalid";
                errorLabel.innerHTML = "Please enter a valid start date";
                valid = false;
            }
        }
        if (form.expirationDate.value !== "") {
            if (isNaN(new Date(form.expirationDate.value))) {
                errorLabel.className = "invalid";
                errorLabel.innerHTML = "Please enter a valid expiration date";
                valid = false;
            }
        }
        if (Object.keys(this.state.customFields).length > 0) { //Test if made a custom field but left it empty
            Object.values(this.state.customFields).forEach(function testForEmpty(item) {
                console.log(item, item.toString(), item.toString().trim() === "");
                if (item.toString().trim() === "") {
                    errorLabel.className = "invalid";
                    errorLabel.innerHTML = "Please fill out all created custom fields";
                    valid = false;
                }
            });
        }

        if (valid) {
            this.setState({
                jobTitle: form.jobTitle.value,
                jobDescription: form.jobDescription.value,
                startDate: form.startDate.value,
                expirationDate: form.expirationDate.value,
                customFieldValues: Object.values(this.state.customFields)
            }, () => { //callback param ensures that setstate occurs before post
                //push data via backend
                console.log('POST');
                axios.post('http://localhost:3001/putData', this.state);
                this.props.closePopup()
            });
        }
        //document.getElementById("posting-form").reset();

      };

    addField() {
        let newInput = `custom-${this.state.customFieldsCounter}`;
        this.state.customFields[newInput] = "";
        this.setState(prevState => ({customFieldsCounter: prevState.customFieldsCounter + 1}));
    }

    deleteInput(input) {
        console.log(input);
        let arr = this.state.customFields;
        delete arr[input];
        this.setState(prevState => ({customFields: arr}));
    }

    handleChange(e, input) {
        let arr = this.state.customFields;
        arr[input] = e.target.value;
        this.setState(prevState => ({customFields: arr}));
    }

    render() {
        let self = this;
        return (
            //Form elements with labels and inputs for job title and job description
            <div className='popup'>
                <div className='popup_inner'>
                    <div className="header"><div className="vertical-center horizontal-center">Post a Job</div></div>
                    <form name="postingInfo" id="posting-form">

                        <div className="form-group">
                            <Label>Job Title<span className="required-Field">*</span></Label>
                            <Input type="text" id="jobTitle" name="jobTitle"
                                   placeholder="Job Title">{this.state.text}</Input>
                            <br/>
                            <Label>Job Description<span className="required-Field">*</span></Label>
                            <Input type="text" name="jobDescription" placeholder="Job Description"
                                   value={this.state.text}/>
                            <br/>
                            <Label>Start Date</Label>
                            <Input type="date" name="startDate" placeholder="Start Date" value={this.state.startDate}/>
                            <br/>
                            <Label>Expiration Date</Label>
                            <Input type="date" name="expirationDate" placeholder="Expiration Date"
                                   value={this.state.expirationDate}/>
                            <br/>
                            <Label>Custom Fields</Label>
                            <div id="fields">
                                {Object.keys(this.state.customFields).map(function (input) {
                                    return (
                                        <div>
                                            <div className="row">
                                                <div className="col text-right">
                                                    <Input key={input} id={input} onChange={(e) => self.handleChange(e, input)} value={self.state.customFields[input]}/>
                                                </div>
                                                <div className="col-sm-3 text-right">
                                                    <Button onClick={() => self.deleteInput(input)}
                                                            color="danger">Delete</Button>
                                                </div>
                                            </div>
                                            <br className="inputBr"/>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="row">
                                <div className="col-sm-3 text-right">
                                    <Button id="addCustom" name="Add Custom" placeholder="Add Field"
                                            onClick={() => this.addField()}>Add Field</Button>
                                </div>
                                <div className="col text-left">
                                    <Label style={{opacity: 0}}> </Label>
                                </div>
                            </div>
                            <br/>
                        </div>


                    </form>
                    <div className="bottomButtons">
                        <label ref="errorLabel" className="valid"> </label>
                        <div className="row">
                            <div className="col text-right">
                                <Button onClick={() => this.handleSubmit()}>Submit</Button>
                            </div>
                            <div className="col text-left">
                                <Button id="closeButton" onClick={this.props.closePopup}>Close</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }


}

class Popup extends React.Component {

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
                    <button id="closeButton" onClick={this.props.closePopup}>Done</button>
                </div>
            </div>
        );
    }
}


export default PostJobPopup;
