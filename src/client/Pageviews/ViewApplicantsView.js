import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';


class ViewApplicantsView extends Component {
    render() {
        return (
          <div className = "view">
           <Link to="/managerview"> 
           <Button class="btn" type="button">
            Back to Manager View
           </Button>
           </Link>
            <div className = "container">
            </div>
          </div>
        );
    }

}

export default ViewApplicantsView;
