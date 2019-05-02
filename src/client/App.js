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
    render() {
        return (
          <div class = "view">
            <header>
              <Menu />
            </header>
            <main>
            <Switch>
              <Route exact path="/" component ={PublicView}/>
              <Route exact path="/ManagerView" component= {ManagerView}/>
              <Route exact path="/ManageJobPostingsView" component= {ManageJobPostingsView}/>
              <Route exact path="/EmployeeView" component= {EmployeeView}/>
              <Route exact path="/ViewApplicantsView" component= {ViewApplicantsView}/>
              <Route component= {ErrorPage}/>
            </Switch>
            </main>
          </div>
        );
    }
}

export default App;
