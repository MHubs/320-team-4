import React, {Component} from 'react';
import axios from 'axios'
import Button from "reactstrap/es/Button";
import {ip} from "../../LandingPageComponents/JobView"

//Popup that allows job title and job description to be changed
class ViewApplicantsPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobID: this.props.job._id,
            companyId: this.props.job.companyId,
            positionTitle: this.props.job.title,
            companyName: this.props.job.companyName,
            applicants: [],
            chosenApplicant: null,
            firstName: '',
            lastName: '',
            email: '',
            customFields:{},
            onBoarding: true,
            startDate: this.props.job.startDate,
            managerId: this.props.job.managerId,
            boarded: false,
            empID: null
        };
        this.togglePopup = this.togglePopup.bind(this);
        this.displayApplicants = this.displayApplicants.bind(this);
        this.onBoardApplicant = this.onBoardApplicant.bind(this);
        this.downloadApplication = this.downloadApplication.bind(this);


        if (this.props.job.customFields.length > 0) {
            var cf = {};
            this.props.job.customFields.forEach(function addFields(item) {
                cf[item] = ""
            });
            this.state.customFields  = cf;
        }
    }



//Method to toggle popup window..


componentDidMount(){
    this.getApplicants();
}

getApplicants = async () => {
    let res = await axios.get('http://'+ip+':3001/getApps');
    let {data} = await res.data;
    this.setState({applicants: data.filter(job =>job.jobID === this.state.jobID)})
};

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    downloadApplication(e, applicant){ //uses blob to download stored resume
      let blob = new Blob([applicant.resume], { //sets file blob
        type: applicant.resume_type
      })
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a"); //a is a temporary link that doesn't display
      document.body.appendChild(a);
      a.style = "display: none"
      a.href = url;
      a.download = applicant.resume_name;
      a.click() //activate a after setting blob to it
      window.URL.revokeObjectURL(url);
    }

    /*handleSubmit = (event) => {
        this.props.closePopup();
    }*/

    displayApplicants(){
        if(this.state.applicants.length >0) {
            var displayedApplicants = this.state.applicants.map(applicant => (
                <div className="applicantsList" key={applicant._id}>
                    <h4>Name: {applicant.firstName + ' ' + applicant.lastName}</h4>
                    <h5>Email: {applicant.email}</h5>
                    <div className="row">
                        <div className="col text-left">
                            <Button onClick={((e) => this.onBoardApplicant(e, applicant))}>Onboard</Button>
                        </div>
                        <div className="col text-right">
                            <Button onClick={(e) => this.downloadApplication(e, applicant)}> Download
                                Application </Button>
                        </div>
                    </div>
                    <hr/>
                </div>));

        } else{
            var displayedApplicants = [];
        }
        return displayedApplicants;


    }

    onBoardApplicant = async (event, applicant) => {
        event.preventDefault();
        this.state.firstName = applicant.firstName;
        this.state.lastName = applicant.lastName;
        this.state.email = applicant.email;


        let res = await axios.post('http://' + ip + ':3001/addEmployee', this.state);
        let {data} = await res.data;
        this.setState({boarded:true,empID:data.id});
    };




    render() {
        let self = this;
        if (!this.state.boarded) {
            return (
                //Form elements with labels and inputs for job title and job description

                <div>

                    <div className='popup'>
                        <div className='popup_inner'>
                            <form name="postingInfo" id="posting-form">
                                <div className="header">
                                    <div className="vertical-center horizontal-center">Applicants
                                        for {this.props.job.title}</div>
                                </div>
                                <div className="form-group">
                                    <div>
                                        {this.displayApplicants()}
                                    </div>
                                </div>

                            </form>
                            <div className="bottomButtons">
                                <label ref="errorLabel" className="valid"> </label>
                                <div className="row">

                                    <div className="col text-left">
                                        <Button id="close" onClick={this.props.closePopup}>Close</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<div>

                <div className='popup'>
                    <div className='popup_inner'>
                        <form name="postingInfo" id="posting-form">
                            <div className="header">
                                <div className="vertical-center horizontal-center">{this.state.firstName} was hired!</div>
                            </div>
                            <div className="form-group">
                                <div>
                                    New EmployeeID is {this.state.empID}
                                </div>
                            </div>

                        </form>
                        <div className="bottomButtons">
                            <label ref="errorLabel" className="valid"> </label>
                            <div className="row">

                                <div className="col text-left">
                                    <Button id="close" onClick={this.props.closePopup}>Close</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
        }

    }


}

class Popup extends React.Component {

    render() {
        console.log(this.props)
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>Posting Preview</h1>
                    <h2>{this.props.jobTitle}</h2>
                    <h4><b>First Name: </b> {this.props.fname}</h4>
                    <h4><b>Last Name: </b>{this.props.lname}</h4>
                    <button id="closeButton" onClick={this.props.closePopup}>Done</button>
                </div>
            </div>
        );
    }
}


export default ViewApplicantsPopup;
