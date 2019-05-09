import React, {Component} from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import {Redirect, Link} from "react-router-dom";
import {Button } from 'reactstrap';
import EmployeeLoginPopup from './EmployeeLoginPopup';
import ManagerLoginPopup from './ManagerLoginPopup';
import {Row, Col} from "reactstrap";

class Menu extends Component {
  constructor(props){
    super(props);
    // Bind the this context to the handler function
    this.handler = this.handler.bind(this);
    this.toggleLoggedIn = this.toggleLoggedIn.bind(this);
    this.state= {
      LoggedIn: false,
      redirect: false,
      employeeshowPopup: false,
      managershowPopup: false,
    }
    this.target= "/"
  }

////function passed to child popups to toggle redirect on valid credentials
  handler() {
    this.setState({
      redirect: true
    });
  }
  //function passed to child popups to toggle log in on valid credentials
  toggleLoggedIn(){
    this.setState({
      LoggedIn: true
    });
  }

  renderRedirect(target){
    if (this.state.redirect) {
      this.setState({redirect:false});
      return <Redirect to={target} />
    }
  }

  toggleEmployeePopup() {
    this.setState({
      employeeshowPopup: !this.state.employeeshowPopup
    });
  }

  toggleManagerPopup() {
    this.setState({
      managershowPopup: !this.state.managershowPopup
    });
  }

  changeTarget(newtarget) {
    this.target = newtarget
  }

  //function handles onClick for logout button
  logoutOnClick(newTarget){
    this.setState({
      redirect: true,
      LoggedIn: false
    });
    this.changeTarget(newTarget);
  }

  //function handles onClick for manager Login
  manOnClick(newTarget){
    this.toggleManagerPopup();
    this.changeTarget(newTarget);
  }

  //function handles onCLick for Employee login
  empOnClick(newTarget){
    this.toggleEmployeePopup();
    this.changeTarget(newTarget)
  }

  render() {
    return (
      <div>
        {console.log("Redirect: ", this.state.redirect)}
        {console.log("LoggedIn: ", this.state.LoggedIn)}
        {this.renderRedirect(this.target)}
          <Navbar style={{backgroundColor: '#519e2f'}}>
            <NavbarBrand style={{color: 'white'}}> Ultimate Hiring App </NavbarBrand>
            <Nav className="ml-auto" navbar>
              {this.state.LoggedIn ? (
                <NavItem>
                  <Button class="btn" size="sm" onClick={this.logoutOnClick.bind(this, '/')}>Log Out</Button>
                </NavItem>
              ) : (
                <React.Fragment>
                  <Row>
                    <Col>
                      <NavItem>
                        <Button className="btn" size="sm" onClick={this.manOnClick.bind(this, '/managerview')}> Manager Login </Button>
                      </NavItem>
                    </Col>
                    <Col>
                      <NavItem>
                        <Button className="btn" size="sm" onClick={this.empOnClick.bind(this, '/employeeview')}> Employee Login </Button>
                      </NavItem>
                    </Col>
                  </Row>

                </React.Fragment>
              )}
            </Nav>
          </Navbar>
        {this.state.employeeshowPopup ? <EmployeeLoginPopup updateCreds= {this.props.updateCreds} closePopup={this.toggleEmployeePopup.bind(this)} toggleRedirect={this.handler} toggleLoggedIn={this.toggleLoggedIn}/> : null }
        {this.state.managershowPopup ? <ManagerLoginPopup updateCreds= {this.props.updateCreds} closePopup={this.toggleManagerPopup.bind(this)} toggleRedirect={this.handler} toggleLoggedIn={this.toggleLoggedIn}/> : null }
      </div>
    )
  }
}
export default Menu;
