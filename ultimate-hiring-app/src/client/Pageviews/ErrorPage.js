import React, {Component} from 'react';
import { Link } from "react-router-dom";

class ErrorPage extends Component{
    render() {
        return (
          <div>
              <header>
              <li>
                <Link to="/">Back to the Main Page</Link>
              </li>
              </header>
            <h1> Lol No jobs here, 404 my guy </h1>
          </div>
        );
    }
}

export default ErrorPage;