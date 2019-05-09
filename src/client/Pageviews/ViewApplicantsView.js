import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import ViewApplicantsByJobs from '../Components/ManagerViewComponents/ViewApplicantsComponents/ViewApplicantsByJobs';

class ViewApplicantsView extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
          <div className = "view">
           <Link to="/managerview"> 
           <Button class="btn" type="button">
            Back to Manager View
           </Button>
           </Link>
            <div className = "container">
                <ViewApplicantsByJobs empID={this.props.empID} compID={this.props.compID}/>
            </div>
          </div>
        );
    }

}

export default ViewApplicantsView;
