import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class LogInbutton extends Component{
    render(){
        return (
            <li>
                <Link to="/managerview">LogIn</Link>
            </li>
        );
    }
}

export default LogInbutton;
