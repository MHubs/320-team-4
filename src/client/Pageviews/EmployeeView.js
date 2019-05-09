import React, {Component} from 'react';

import EmployeeDash from "../Components/EmployeeViewComponents/EmployeeDash";

class EmployeeView extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <div className="Postings">
                  <h1>Welcome Back!</h1>
                    <EmployeeDash empID= {this.props.empID} compID= {this.props.compID}/>
                    <br/>
                    <br/>
                </div>
            </div>
        );
    }
}

export default EmployeeView;
