import React, {Component} from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import JobPostingCard from "./JobPostingCard";


class CurrentJobPostingCards extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      jobsList: this.props.jobs.reverse(),
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



  render() {
      const {jobsList: jobs, currentPage, jobsPerPage} = this.state;

      // Logic for displaying current jobPostings
      const indexOfLastJobPosting = currentPage * jobsPerPage;
      const indexOfFirstJobPosting = indexOfLastJobPosting - jobsPerPage;
      const currentJobPosting = jobs.slice(indexOfFirstJobPosting, indexOfLastJobPosting);


      //Logic for displaying 6 cards per page
      let JobPostingCardArray = currentJobPosting.map(function (object, index) {
          if (index % 6 === 0) {
              return (
                  <div>
                      <div className="row">
                          <div className="c1"><JobPostingCard title={jobs[(currentPage - 1) * 6 + index % 6].title}
                                                              company={jobs[(currentPage - 1) * 6 + index % 6].companyName}
                                                              description={jobs[(currentPage - 1) * 6 + index % 6].description}
                                                              job={jobs[(currentPage - 1) * 6 + index % 6]}/></div>
                          <div className="c2"><JobPostingCard
                              invisible={(currentPage - 1) * 6 + (index + 1) % 6 >= jobs.length}
                              title={(currentPage - 1) * 6 + (index + 1) % 6 < jobs.length ? jobs[(currentPage - 1) * 6 + (index + 1) % 6].title : ""}
                              company={(currentPage - 1) * 6 + (index + 1) % 6 < jobs.length ? jobs[(currentPage - 1) * 6 + (index + 1) % 6].companyName : ""}
                              description={(currentPage - 1) * 6 + (index + 1) % 6 < jobs.length ? jobs[(currentPage - 1) * 6 + (index + 1) % 6].description : ""}
                              job={jobs[(currentPage - 1) * 6 + (index + 1) % 6]}/></div>
                          <div className="c3"><JobPostingCard
                              invisible={(currentPage - 1) * 6 + (index + 2) % 6 >= jobs.length}
                              title={(currentPage - 1) * 6 + (index + 2) % 6 < jobs.length ? jobs[(currentPage - 1) * 6 + (index + 2) % 6].title : ""}
                              company={(currentPage - 1) * 6 + (index + 2) % 6 < jobs.length ? jobs[(currentPage - 1) * 6 + (index + 2) % 6].companyName : ""}
                              description={(currentPage - 1) * 6 + (index + 2) % 6 < jobs.length ? jobs[(currentPage - 1) * 6 + (index + 2) % 6].description : ""}
                              job={jobs[(currentPage - 1) * 6 + (index + 2) % 6]}/></div>
                          <br/>
                          <div className="c4"><JobPostingCard
                              invisible={(currentPage - 1) * 6 + (index + 3) % 6 >= jobs.length}
                              title={(currentPage - 1) * 6 + (index + 3) % 6 < jobs.length ? jobs[(currentPage - 1) * 6 + (index + 3) % 6].title : ""}
                              company={(currentPage - 1) * 6 + (index + 3) % 6 < jobs.length ? jobs[(currentPage - 1) * 6 + (index + 3) % 6].companyName : ""}
                              description={(currentPage - 1) * 6 + (index + 3) % 6 < jobs.length ? jobs[(currentPage - 1) * 6 + (index + 3) % 6].description : ""}
                              job={jobs[(currentPage - 1) * 6 + (index + 3) % 6]}/></div>
                          <div className="c5"><JobPostingCard
                              invisible={(currentPage - 1) * 6 + (index + 4) % 6 >= jobs.length}
                              title={(currentPage - 1) * 6 + (index + 4) % 6 < jobs.length ? jobs[(currentPage - 1) * 6 + (index + 4) % 6].title : ""}
                              company={(currentPage - 1) * 6 + (index + 4) % 6 < jobs.length ? jobs[(currentPage - 1) * 6 + (index + 4) % 6].companyName : ""}
                              description={(currentPage - 1) * 6 + (index + 4) % 6 < jobs.length ? jobs[(currentPage - 1) * 6 + (index + 4) % 6].description : ""}
                              job={jobs[(currentPage - 1) * 6 + (index + 4) % 6]}/></div>
                          <div className="c6"><JobPostingCard
                              invisible={(currentPage - 1) * 6 + (index + 5) % 6 >= jobs.length}
                              title={(currentPage - 1) * 6 + (index + 5) % 6 < jobs.length ? jobs[(currentPage - 1) * 6 + (index + 5) % 6].title : ""}
                              company={(currentPage - 1) * 6 + (index + 5) % 6 < jobs.length ? jobs[(currentPage - 1) * 6 + (index + 5) % 6].companyName : ""}
                              description={(currentPage - 1) * 6 + (index + 5) % 6 < jobs.length ? jobs[(currentPage - 1) * 6 + (index + 5) % 6].description : ""}
                              job={jobs[(currentPage - 1) * 6 + (index + 5) % 6]}/></div>

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
              <br/>
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



export default CurrentJobPostingCards;


