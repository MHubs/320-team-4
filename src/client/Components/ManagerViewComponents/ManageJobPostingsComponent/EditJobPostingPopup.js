import React, {Component} from 'react';
import axios from 'axios'
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import Button from "reactstrap/es/Button";


//Popup that allows job title and job description to be changed
class EditJobPostingPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: this.props.job,
            jobTitle: this.props.job.title,
            jobDescription: this.props.job.description,
            startDate: this.props.job.startDate,
            expirationDate: this.props.job.postingExpirationDate,
            customFields: {},
            customFieldValues: this.props.job.customFields,
            customFieldsCounter: this.props.job.customFields.length
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleExpirationChange = this.handleExpirationChange.bind(this);

        var i;
        for (i = 0; i < this.props.job.customFields.length; i++) {
            let newInput = `custom-${i}`;
            this.state.customFields[newInput] = this.props.job.customFields[i];
        }
    }

//Method to toggle popup window..
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    handleTitleChange(event) {
        this.setState({jobTitle: event.target.value})
    }

    handleDescriptionChange(event) {
        this.setState({jobDescription: event.target.value})
    }

    handleStartChange(event) {
        this.setState({startDate: event.target.value})
    }

    handleExpirationChange(event) {
        this.setState({expirationDate: event.target.value})
    }

//Method for action after hitting the submit button
    handleSubmit = (event) => {
        // event.preventDefault();
        // axios.post('http://localhost:3001/updateData', this.state);

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
                axios.post('http://localhost:3001/updateData', this.state);
                this.props.closePopup();
                window.location.reload();
            });
        }


        //this.props.closePopup();
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
        console.log(e.target.value, input);
        this.setState(prevState => ({customFields: arr}));
    }


    render() {
        let self = this;
        return (
            //Form elements with labels and inputs for job title and job description

            <div>
                <div className='popup'>
                    <div className='popup_inner'>
                        <form name="postingInfo" id="editable-posting-form">
                            <div className="header">
                                <div className="vertical-center horizontal-center">Edit {this.state.jobTitle}</div>
                            </div>
                            <div className="form-group">
                                <Label>Job Title</Label>
                                <Input type="text" id="jobTitle" name="jobTitle" value={this.state.jobTitle} onChange={this.handleTitleChange}/>
                                <br/>
                                <Label>Job Description</Label>
                                <Input type="text" value={this.state.jobDescription} name="jobDescription" placeholder="Job Description"
                                       onChange={this.handleDescriptionChange}/>
                                <br/>
                                <Label>Start Date</Label>
                                <Input type="date" name="startDate" placeholder="Start Date"
                                       value={this.state.startDate} onChange={this.handleStartChange}/>
                                <br/>
                                <Label>Expiration Date</Label>
                                <Input type="date" name="expirationDate" placeholder="Expiration Date"
                                       value={this.state.expirationDate} onChange={this.handleExpirationChange}/>
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
                                    <Button onClick={() => this.handleSubmit()}>Save</Button>
                                </div>
                                <div className="col text-left">
                                    <Button id="closeButton" onClick={this.props.closePopup}>Close</Button>
                                </div>
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
                    <h4><b>First Name: </b> {this.props.fname}</h4>
                    <h4><b>Last Name: </b>{this.props.lname}</h4>
                    <button id="closeButton" onClick={this.props.closePopup}>Done</button>
                </div>
            </div>
        );
    }
}


export default EditJobPostingPopup;
