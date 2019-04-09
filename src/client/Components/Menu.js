import React, {Component} from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

class Menu extends Component {
  constructor(props){
    super(props);
    this.state= {LoggedIn:false}
  }

  render() {
    return (
      <div>
        <Navbar style={{backgroundColor: '#519e2f'}}>
          <NavbarBrand style={{color: 'white'}}> Ultimate Hiring App</NavbarBrand>
          <Nav className="ml-auto" navbar>
          {this.LoggedIn ? (
             <NavItem>
              <NavLink href="/"> Log Out </NavLink>
             {/*{this.setState({notLoggedIn: false})}*/}
             </NavItem>
          ) : (
            <NavItem>
            <NavLink href="/managerview"> Log In </NavLink>
            {/*{this.setState({notLoggedIn: true})}*/}
            </NavItem>
          )}
          </Nav>
        </Navbar>
      </div>
    )
  }
}
export default Menu;
