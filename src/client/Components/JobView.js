import React, {Component} from 'react';
import axios from 'axios'
import { Container, Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import JobPostingCard from "./JobPostingCard";
import CurrentJobPostingCards from "./CurrentJobPostingCards";
class JobView extends Component {

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
					<React.Fragment>
						<CurrentJobPostingCards jobs={this.state.jobs}/>
					</React.Fragment>
				</Container>
			)
		}

		return <div>Loading...</div>;
	}

}

export default JobView;
