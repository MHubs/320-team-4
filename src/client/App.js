import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from './Components/UniversalComponents/Menu';

import PublicView from './Pageviews/PublicView';
import ManagerView from './Pageviews/ManagerView';
import ManageJobPostingsView from './Pageviews/ManageJobPostingsView';
import ErrorPage from './Pageviews/ErrorPage';
import EmployeeView from "./Pageviews/EmployeeView";
import ViewApplicantsView from "./Pageviews/ViewApplicantsView";



class App extends Component {

  constructor(){
    super();
    this.updateUserCreds = this.updateUserCreds.bind(this);
    this.state= {
      employeeID: 0,
      companyID: 0
    }

    
  }

  updateUserCreds(empID, compID){
    this.setState({
      employeeID: empID,
      companyID: compID
    });
  }

    render() {
        return (
          <div class = "view">
            <header>
              <Menu updateCreds={this.updateUserCreds}/>
            </header>
            <main>
            <Switch>
              <Route exact path="/" component ={PublicView}/>
              <Route exact path="/ManagerView" component= {() => <ManagerView empID={this.state.employeeID} compID= {this.state.companyID}/>}/>
              <Route exact path="/ManageJobPostingsView" component= {() => <ManageJobPostingsView empID={this.state.employeeID} compID= {this.state.companyID}/>}/>
              <Route exact path="/EmployeeView" component= {() => <EmployeeView empID={this.state.employeeID} compID= {this.state.companyID}/>}/>
              <Route exact path="/ViewApplicantsView" component= {() => <ViewApplicantsView empID={this.state.employeeID} compID= {this.state.companyID}/>}/>
              <Route component= {ErrorPage}/>
            </Switch>
            </main>
          </div>
        );
    }
}

export default App;
