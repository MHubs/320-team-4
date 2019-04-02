import React, {Component} from 'react';
import JobView from '../Components/JobView';
import LogInbutton from '../Components/LogInbutton';

class PublicView extends Component {
    render() {
        return (
          <div className = "view">
            <header>
              <LogInbutton />
            </header>
            <div className = "container">
            <JobView />
            </div>
          </div>
        );
    }

}

export default PublicView;
