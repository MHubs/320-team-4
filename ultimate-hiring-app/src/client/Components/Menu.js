import React, {Component} from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

class Menu extends Component {
  constructor(props){
    super(props);
    this.state= {notLoggedIn:true}
  }

  render() {
    return (
      <div>
        <Navbar style={{backgroundColor: '#519e2f'}}>
          <NavbarBrand> Ultimate Hiring App</NavbarBrand>
          <Nav className="ml-auto" navbar>
          {this.notLoggedIn ? (
             <NavItem>
             <NavLink href="/managerview"> Log in </NavLink>
             {/*{this.setState({notLoggedIn: false})}*/}
             </NavItem>
          ) : (
            <NavItem>
            <NavLink href="/"> Log out </NavLink>
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
