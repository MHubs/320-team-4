import React, {Component} from 'react';
import axios from 'axios/index'
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";
import Button from "reactstrap/es/Button";
import {ip} from "../LandingPageComponents/JobView";

//Popup that allows job title and job description to be changed
class EditJobPostingPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyID: this.props.employee.companyId,
            employeeID: this.props.employee.employeeId,
            employee: this.props.employee,
            customFields: this.props.employee.customFields,
            onBoarding: this.props.employee.onBoarding
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
        // event.preventDefault();
        // axios.post('http://localhost:3001/updateData', this.state);

        let errorLabel = this.refs.errorLabel;
        let form = document.forms.namedItem("postingInfo");
        //format data according to data dump
        //NOTE: data dump doesn't include posting ID. I'm wondering if we need it or if we'll always query by manager id and position title
        //for example, an employee wouldn't apply for a posting. They'd apply to a title. Then positions would be filled as they're filled

        var valid = true;

        if (Object.keys(this.state.customFields).length > 0) { //Test if made a custom field but left it empty
            Object.values(this.state.customFields).forEach(function testForEmpty(item) {
                if (item.toString().trim() === "") {
                    errorLabel.className = "invalid";
                    errorLabel.innerHTML = "Please fill out all fields";
                    valid = false;
                }
            });
        }

        if (valid) {
            this.setState({
                customFields: this.state.customFields,
                onBoarding: false
            }, () => { //callback param ensures that setstate occurs before post
                //push data via backend
                console.log('POST');
                axios.post('http://'+ip+':3001/updateEmployee', this.state);
                this.props.closePopup();
            });
        }


        //this.props.closePopup();
    };

    handleChange(e, input) {
        let arr = this.state.customFields;
        arr[input] = e.target.value;
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
                                <div className="vertical-center horizontal-center">Employee Onboarding</div>
                            </div>
                            <div className="form-group">
                                <Label>Custom Fields</Label>
                                <div id="fields">
                                    {Object.keys(this.state.customFields).map(function (input) {
                                        return (
                                            <div>
                                                <div >
                                                    <Label>{input}</Label>
                                                    <Input key={input} id={input} onChange={(e) => self.handleChange(e, input)} value={self.state.customFields[input]}/>
                                                </div>
                                            </div>
                                        )
                                    })}
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


export default EditJobPostingPopup;
