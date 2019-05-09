import React, {Component} from 'react';
import Label from "reactstrap/es/Label";
import Button from "reactstrap/es/Button";

class ProfilePopup extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div className="header">
                        <div className="vertical-center horizontal-center">{this.props.employee.firstName}'s Profile
                        </div>
                    </div>
                    <div className="form-group">
                        <Label style={{fontWeight: "bold"}}>Name:  </Label><br/>
                        <p>{this.props.employee.firstName + " " + this.props.employee.lastName}</p>
                        <Label style={{fontWeight: "bold"}}>Email:</Label><br/>
                        <p>{this.props.employee.email}</p>
                        <Label style={{fontWeight: "bold"}}>Company:</Label><br/>
                        <p>{this.props.employee.companyName}</p>
                        <Label style={{fontWeight: "bold"}}>Position:</Label><br/>
                        <p>{this.props.employee.positionTitle}</p>
                        <Label style={{fontWeight: "bold"}}>Start Date:</Label><br/>
                        <p>{this.props.employee.startDate}</p>
                    </div>
                    <div className="bottomButtons">
                        <label ref="errorLabel" className="valid"> </label>
                        <div className="row">

                            <div className="col text-left">
                                <Button id="close" onClick={this.props.closePopup}>Close</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default ProfilePopup