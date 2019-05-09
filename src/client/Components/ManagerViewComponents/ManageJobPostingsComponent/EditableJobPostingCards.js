import React, {Component} from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import ManageableJobPostingCard from "./ManageableJobPostingCard";

//Called by ManagePostings.JS
//Modified version of JobPostingCards that has edit and delete functionality
//Renders EditJobPostingPopup.js if edit button is pressed
//Deletes job if delete button is pressed
class EditableJobPostingCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobsList: this.props.jobs.reverse().filter(job => job.companyId == this.props.compID && job.managerId == this.props.empID),
            currentPage: 1,
            jobsPerPage: 6
        };
        this.handleClick = this.handleClick.bind(this);
        this.toStart = this.toStart.bind(this);
        this.toLast = this.toLast.bind(this);
    }

    //Handle clicks when navigation buttons are pressed
    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    toStart(event) {
        this.setState({
            currentPage: 1
        });
    }

    setJobs(jobs) {
        this.setState({jobsList: jobs});
    }

    render() {
        const {jobsList: jobs, currentPage, jobsPerPage} = this.state;

        // Logic for displaying current jobPostings
        const indexOfLastJobPosting = currentPage * jobsPerPage;
        const indexOfFirstJobPosting = indexOfLastJobPosting - jobsPerPage;
        const currentJobPosting = jobs.slice(indexOfFirstJobPosting, indexOfLastJobPosting);

        const empID =  this.props.empID;
        const compID = this.props.compID;

        let self = this;

        //Logic for displaying 6 cards per page
        let JobPostingCardArray = currentJobPosting.map(function (object, index) {
            if (index % 6 === 0) {
                return (
                    <div>
                        <div className="row">
                                    <div className="c1"> <ManageableJobPostingCard
                                        invisible={(currentPage - 1) * 6 + (index) % 6 >= jobs.length}
                                        job={jobs[(currentPage - 1) * 6 + index % 6]}
                                        key={index}
                                        setJobs={self.setJobs.bind(self)}
                                        compID={compID}
                                        empID={empID}
                                    />
                                    </div>
                                    <div className="c2"> <ManageableJobPostingCard
                                        invisible={(currentPage - 1) * 6 + (index + 1) % 6 >= jobs.length}
                                        job={jobs[(currentPage - 1) * 6 + (index + 1) % 6]}
                                        key={index + 1}
                                        setJobs={self.setJobs.bind(self)}
                                        compID={compID}
                                        empID={empID}/>
                                    </div>
                                    <div className="c3"> <ManageableJobPostingCard
                                        invisible={(currentPage - 1) * 6 + (index + 2) % 6 >= jobs.length}
                                        job={jobs[(currentPage - 1) * 6 + (index + 2) % 6]}
                                        key={index + 2}
                                        setJobs={self.setJobs.bind(self)}
                                        compID={compID}
                                        empID={empID}/>
                                    </div>
                                    <div className="c4"> <ManageableJobPostingCard
                                        invisible={(currentPage - 1) * 6 + (index + 3) % 6 >= jobs.length}
                                        job={jobs[(currentPage - 1) * 6 + (index + 3) % 6]}
                                        key={index + 3}
                                        setJobs={self.setJobs.bind(self)}
                                        compID={compID}
                                        empID={empID}/>
                                    </div>
                                    <div className="c5"> <ManageableJobPostingCard
                                        invisible={(currentPage - 1) * 6 + (index + 4) % 6 >= jobs.length}
                                        job={jobs[(currentPage - 1) * 6 + (index + 4) % 6]}
                                        key={index + 4}
                                        setJobs={self.setJobs.bind(self)}
                                        compID={compID}
                                        empID={empID}/>
                                    </div>
                                    <div className="c6"> <ManageableJobPostingCard
                                        invisible={(currentPage - 1) * 6 + (index + 5) % 6 >= jobs.length}
                                        job={jobs[(currentPage - 1) * 6 + (index + 5) % 6]}
                                        key={index + 5}
                                        setJobs={self.setJobs.bind(self)}
                                        compID={compID}
                                        empID={empID}/>
                                    </div>
                        </div>
                    </div>)
            }

        });


        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(jobs.length / jobsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <div>
                    <PaginationItem>
                        <PaginationLink
                            key={number}
                            id={number}
                            onClick={this.handleClick}
                        >
                            {number}
                        </PaginationLink>
                    </PaginationItem>
                </div>
            );
        });

        return (
            <div>
                {JobPostingCardArray}
                <Pagination aria-label="Page navigation" style={{position: "absolute", top: "90%", padding: "10px"}}>
                    <PaginationItem>
                        <PaginationLink previous onClick={this.toStart}/>
                    </PaginationItem>
                    {
                        renderPageNumbers
                    }
                    <PaginationItem>
                        <PaginationLink next onClick={this.toLast}/>
                    </PaginationItem>
                </Pagination>
            </div>

        );
    }

    toLast(event) {
        this.setState({
            currentPage: Math.ceil(this.state.jobsList.length / 6)
        });
    }
}


export default EditableJobPostingCards;


