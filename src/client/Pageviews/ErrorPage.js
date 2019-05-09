import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {Button} from "reactstrap";

class ErrorPage extends Component{
    render() {
        return (
          <div>
              <header>
              
              <Link to="/">
              <Button class="btn" type="button">
              Back to Public View
              </Button>
              </Link>
              </header>
            <h1> Lol No jobs here, 404 my guy </h1>
          </div>
        );
    }
}

export default ErrorPage;