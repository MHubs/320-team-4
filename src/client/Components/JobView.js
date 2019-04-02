import React, {Component} from 'react';
import axios from 'axios'
class JobView extends Component {
  render() {

      //Use getIP method rather than localhost
  	axios.get('http://localhost:3001/getData').then(function (response) {
	//handle success
	// Shows form data: console.log(response.data)
        console.log(response.data);
	})
	.catch(function(error){
		//alert("Error retrieving job posting data")
	})
	.then(function(){
		//always executed, display here
	})
    return (
      <div>
        <h1> Welcome Stranger!</h1>
      </div>
    )
  }
}
export default JobView;
