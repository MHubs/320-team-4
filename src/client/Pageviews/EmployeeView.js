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
                    <EmployeeDash employee={this.props.employee}/>
                    <br/>
                    <br/>
                </div>
            </div>
        );
    }
}

export default EmployeeView;
