import React, {Component} from 'react';
import axios from 'axios'
import { Container} from 'reactstrap';
import CurrentJobPostingCards from "./CurrentJobPostingCards";
export class JobView extends Component {

	state = {
		jobs: null
	};

	componentDidMount(){
		this.getJobs();
	}

	getJobs = async () => {
		let res = await axios.get('http://'+ip+':3001/getData');
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
export var ip = window.location.host.substr(0,window.location.host.indexOf(":"));
export default {JobView,ip};
