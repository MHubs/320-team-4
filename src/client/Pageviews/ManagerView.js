import React, {Component} from 'react';

import ManagerDash from '../Components/ManagerViewComponents/ManagerDash';


class ManagerView extends Component{
  render(){
    return (
      <div>
        <div className="Postings">
          <h1>Welcome Back!</h1>
          <ManagerDash />
          <br></br>
          <br></br>
        </div>
      </div>
      );
    }
}

export default ManagerView;
