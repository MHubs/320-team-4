import React, {Component} from 'react';

import ManagePostings from '../Components/ManagerViewComponents/ManageJobPostingsComponent/ManagePostings';

//Renderds Manage Postings to show Job Posting cards with edit/delete feature
class ManagePostingsView extends Component {
    render() {
        return (
          <div className = "view">
            <div className = "container">
            <ManagePostings empID= {this.props.empID} compID= {this.props.compID}/>
            </div>
          </div>
        );
    }

}

export default ManagePostingsView;
