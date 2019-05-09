import React, { Component } from 'react';
import axios from 'axios';
import Input from "reactstrap/es/Input";
import Button from "reactstrap/es/Button";
import Label from "reactstrap/es/Label";

class EmployeeLoginPopup extends Component {
    constructor(props){
        super(props);
        this.state = {
            companyID: 0,
            employeeID: 0,
            showPopup: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePopup = this.togglePopup.bind(this);

    }

  //sets boolean popup state
  togglePopup(){
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  handleSubmit = (event) => {
    let valid = true;
    let errorLabel = this.refs.errorLabel;
    let form = document.forms.namedItem("postingInfo");
    //check form for valid input
    if (form.employeeId.value.trim() === ""){
      errorLabel.className = "invalid";
      errorLabel.innerHTML = "Please enter a valid Employee ID";
      valid = false;
    } else if (form.companyId.value.trim() !== "1" && form.companyId.value.trim() !== "2") {
      errorLabel.className = "invalid";
      errorLabel.innerHTML = "Please enter a vaid Company ID";
      valid = false;
    }

    //once valid, proceed
    if (valid) {
        this.setState({
            companyID: form.companyId.value,
            employeeID: form.employeeId.value,
        }, () => {
            //call back here should close pop up and redirect to managerDash
            this.props.toggleRedirect();
            this.props.toggleLoggedIn();
            this.props.closePopup();
            this.props.updateCreds(this.state.employeeID, this.state.companyID)
        });
    }

  }

  render() {
    return (
      <div>
        <div className='popup'>
          <div className='popup_inner'>
            <div className="header"><div className="vertical-center horizontal-center">Please Enter Your Credentials</div></div>
            <form name="postingInfo" id="posting-form">
              <div className="form-group">
                <Label>Employee ID<span className="required-Field">*</span></Label>
                <Input type="number" id="employeeId" name="employeeId" placeholder="Enter Employee ID">{this.state.text}</Input>
                <br/>
                <Label>Company ID<span className="required-Field">*</span></Label>
                <Input type="number" id="companyId" name="companyId" placeholder="Enter Company ID">{this.state.text}</Input>
                <br/>
				<Label>*For Demo* Enter 1-50 for Company 1, or 1-150 for Company 2 (Range increases after new hires)</Label>
              </div>
            </form>
            <div className="bottomButtons">
              <label ref="errorLabel" className="valid"> </label>
              <div className="row">
                <div className="col text-right">
                  <Button onClick={() => this.handleSubmit()}>Submit</Button>
                </div>
                <div className="col text-left">
                  <Button id=".closeButton" onClick={this.props.closePopup}>Close</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
export default EmployeeLoginPopup;
