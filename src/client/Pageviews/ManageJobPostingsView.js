import React, {Component} from 'react';

import JobView from '../Components/LandingPageComponents/JobView';

import ManagePostings from '../Components/ManagerViewComponents/ManageJobPostingsComponent/ManagePostings';

//Renderds Manage Postings to show Job Posting cards with edit/delete feature
class ManagePostingsView extends Component {
    render() {
        return (
          <div className = "view">
            <div className = "container">
            <ManagePostings />
            </div>
          </div>
        );
    }

}

export default ManagePostingsView;
