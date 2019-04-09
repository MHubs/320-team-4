import React, {Component} from 'react';
import JobPostingPopup from '../Components/PostJobPopup';
import ManagerDash from '../Components/ManagerDash';
import LogOutButton from '../Components/LogOutButton';

class ManagerView extends Component{
  render(){
    return (
      <div>
        <header>
          <LogOutButton/>
        </header>
        <div className="Postings">
          <ManagerDash />
          <br></br>
          <br></br>
        </div>
      </div>
      );
    }
}

export default ManagerView;
