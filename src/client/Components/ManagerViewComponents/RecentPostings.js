import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class RecentPostings extends React.Component {
  render() {
    return (
      <ListGroup flush>
        <h4>Recent Job Postings </h4>
        <ListGroupItem> Job Posting </ListGroupItem>
        <ListGroupItem> Job Posting </ListGroupItem>
        <ListGroupItem> Job Posting </ListGroupItem>
        <ListGroupItem> Job Posting </ListGroupItem>
        <ListGroupItem> Job Posting </ListGroupItem>
        <ListGroupItem> Job Posting </ListGroupItem>
        <ListGroupItem> Job Posting </ListGroupItem>
      </ListGroup>
    );
  }
}
