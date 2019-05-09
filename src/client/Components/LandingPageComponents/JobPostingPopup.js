import React, {Component} from 'react';
import axios from 'axios'
import Input from "reactstrap/es/Input";
import Button from "reactstrap/es/Button";
import Label from "reactstrap/es/Label";
import {ip} from "./JobView";

class JobPostingPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            email: '',
            jobID: this.props.job._id
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePopup = this.togglePopup.bind(this);

    }

//Method to toggle popup window..
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

//Method for action after hitting the submit button
    handleSubmit = (event) => {
        event.preventDefault();
        let errorLabel = this.refs.errorLabel;
        let form = document.forms.namedItem("postingInfo");
        //format data according to data dump
        //NOTE: data dump doesn't include posting ID. I'm wondering if we need it or if we'll always query by manager id and position title
        //for example, an employee wouldn't apply for a posting. They'd apply to a title. Then positions would be filled as they're filled

        var valid = true;
        if (form.fname.value.trim() === "") {
            errorLabel.className = "invalid";
            errorLabel.innerHTML = "Please enter your first name";
            valid = false;
        } else
        if (form.lname.value.trim() === "") {
            errorLabel.className = "invalid";
            errorLabel.innerHTML = "Please enter your last name";
            valid = false;
        } else
        if (form.email.value.trim() === "" || !this.validateEmail(form.email.value)) {
            errorLabel.className = "invalid";
            errorLabel.innerHTML = "Please enter a valid email";
            valid = false;
        }


        if (valid) {

            this.setState({
                fname: form.fname.value,
                lname: form.lname.value,
                email: form.email.value,
				resume: form.resume.value,
        resume_type: form.resume.files[0].type, //need to store type and name for use with blob
        resume_name: form.resume.files[0].name,
        jobID: this.props.job._id,
            }, () => { //callback param ensures that setstate occurs before post
                //push data via backend
                console.log(this.state.fname);
                axios.post('http://'+ip+':3001/putApp', this.state);
                this.props.closePopup();
            });
        }
        //document.getElementById("posting-form").reset();

    };

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    render() {
        console.log(this.state.jobID);
        return (
            //Form elements with labels and inputs for job title and job description
            <div>
                <div className='popup'>
                    <div className='popup_inner'>
                        <form name="postingInfo" id="posting-form">
                            <div className="header">
                                <div className="vertical-center horizontal-center">Apply For {this.props.job.title}</div>
                            </div>
                            <div className="form-group">
                                <div >
                                <Label>First Name<span className="required-Field">*</span></Label>
                                <Input type="text" name="fname" placeholder="First Name" value={this.state.text}/>
                                <br/>
                                <Label>Last Name<span className="required-Field">*</span></Label>
                                <Input type="text" name="lname" placeholder="Last Name" value={this.state.text}/>
                                <br/>
                                <Label>Email<span className="required-Field">*</span></Label>
                                <Input type="email" name="email" placeholder="example@domain.com" value={this.state.text}/>
                                <br/>
								<Label>Resume<span className="required-Field">*</span></Label>
								<Input type="file" name="resume" value={this.state.file} />
								<br/>
                                </div>
                            </div>

                        </form>
                        <div className="bottomButtons">
                            <label ref="errorLabel" className="valid"> </label>
                            <div className="row">
                                <div className="col text-right">
                                    <Button id="submitButton" onClick={this.handleSubmit}>Submit Application</Button>
                                </div>
                                <div className="col text-left">
                                    <Button id="close" onClick={this.props.closePopup}>Close</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }


}


export default JobPostingPopup;
