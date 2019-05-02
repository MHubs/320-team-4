import React, {Component} from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import {Redirect, Link} from "react-router-dom";
import {Button } from 'reactstrap';

class Menu extends Component {
  constructor(props){
    super(props);
    this.state= {LoggedIn:false, redirect:false}
    this.target= "/"
  }

  toggleSignIn(newtarget) {

    this.setState({
      LoggedIn: !this.state.LoggedIn,
      redirect: true
    });
    this.target=newtarget

  }

  renderRedirect(target){
    if (this.state.redirect) {
      this.setState({redirect:false});
      return <Redirect to={target} />
    }
  }

  render() {
  return (
        <div>
          {this.renderRedirect(this.target)}
          <Navbar style={{backgroundColor: '#519e2f'}}>
            <NavbarBrand style={{color: 'white'}}> Ultimate Hiring App</NavbarBrand>
            <Nav className="ml-auto" navbar>
              {this.state.LoggedIn ? (
                  <NavItem>
                    <Button class="btn" onClick={this.toggleSignIn.bind(this, '/')}>Log Out</Button>
                  </NavItem>
              ) : (
                  
                  <NavItem>
                    <Button class="btn" onClick={this.toggleSignIn.bind(this,'/managerview' )}> Manager Log In </Button>
                    <Button class="btn" onClick={this.toggleSignIn.bind(this, '/employeeview')}> Employee Log In </Button>
                  </NavItem>
              )}
          </Nav>
        </Navbar>
      </div>
    )
  }
}
export default Menu;
