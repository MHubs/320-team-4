import React, {Component} from 'react';
import { Link } from "react-router-dom";


class LogOutbutton extends Component{
    render(){
        return (
            <li>
                <Link to="/">LogOut</Link>
            </li>
        );
    }
}

export default LogOutbutton;