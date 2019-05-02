import React, {Component} from 'react';
import axios from 'axios'
import Label from "reactstrap/es/Label";
import Button from "reactstrap/es/Button";

class ProfilePopup extends Component{
    constructor(props){
        super(props)
    }

    render(){
        let self = this
        return(
            <div className='popup'>
                <div className='popup_inner'>
                <div className="header">
                    <div className="vertical-center horizontal-center">{this.props.employee.firstName}'s Profile</div>
                </div>
                <div className="form-group">
                <Label style={{fontWeight: "bold"}}>Name: </Label>{this.props.employee.lastName}<br/>
                <Label style={{fontWeight: "bold"}}>Email: </Label>{this.props.employee.email}<br/>
                <Label style={{fontWeight: "bold"}}>Company: </Label>{this.props.employee.companyName}<br/>
                <Label style={{fontWeight: "bold"}}>Position: </Label>{this.props.employee.positionTitle}<br/>
                <Label style={{fontWeight: "bold"}}>Start Date: </Label>{this.props.employee.startDate}<br/>
                </div>
                <div className="bottomButtons">
                    <Button id="closeButton" onClick={this.props.closePopup}>Close</Button>
                </div>
                </div>
            </div>
        )
    }


}

export default ProfilePopup