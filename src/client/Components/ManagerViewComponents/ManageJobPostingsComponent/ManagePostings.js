import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import { Container, Button} from 'reactstrap';
import EditableJobPostingCards from "./EditableJobPostingCards";
//Component Rendered by ManagePostingsView
//Renders EditableJobPostingCards that allow you to Edit or Delete Job Postings 
class ManagePostings extends React.Component {
    state = {
		jobs: null
	};

	componentDidMount(){
		this.getJobs();
	}

	getJobs = async () => {
		let res = await axios.get('http://localhost:3001/getData');
		let {data} = await res.data;
		console.log(data);
		this.setState({jobs: data})
	};

	render() {
		if (this.state.jobs) {

			return (
				<Container fluid>

         <Link to="/managerview">
           <Button class="btn" type="button">
            Back to Manager View
           </Button>
         </Link>


					<React.Fragment>
						<EditableJobPostingCards jobs={this.state.jobs}/>
					</React.Fragment>
				</Container>
			)
		}

		return <div>Loading...</div>;
	}
}


export default ManagePostings;
