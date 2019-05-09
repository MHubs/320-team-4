import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import PostJobCard from "./PostJobComponents/PostJobCard";
import OrgChartCard from "./OrgChartComponents/OrgChartCard";
import ViewApplicantsCard from "./ViewApplicantsComponents/ViewApplicantsCard";
import ManPostingsCard from "./ManageJobPostingsComponent/ManPostingsCard";


class ManagerDash extends Component {
  constructor(props){
    super(props);
  }

  render () {
    return (
        <div>
            <Row>
              <div className="mcard1"> <OrgChartCard  empID= {this.props.empID} compID= {this.props.compID}/> </div>
              <div className="mcard2"> <ViewApplicantsCard  empID= {this.props.empID} compID= {this.props.compID}/> </div>
            <br/>
              <div className="mcard3"> <ManPostingsCard  empID= {this.props.empID} compID= {this.props.compID}/> </div>
              <div className="mcard4"> <PostJobCard  empID= {this.props.empID} compID= {this.props.compID}/> </div>
            </Row>
        </div>

    )





    }
}

export default ManagerDash;
