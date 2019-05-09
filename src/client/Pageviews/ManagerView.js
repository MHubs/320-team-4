import React, {Component} from 'react';

import ManagerDash from '../Components/ManagerViewComponents/ManagerDash';


class ManagerView extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <div className="Postings">
          <h1>Welcome Back!</h1>
          <ManagerDash empID= {this.props.empID} compID= {this.props.compID}/>
          <br></br>
          <br></br>
        </div>
      </div>
      );
    }
}

export default ManagerView;
