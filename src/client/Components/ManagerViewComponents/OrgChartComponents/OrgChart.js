import React, { Component } from 'react';
import axios from 'axios';
import Tree from 'react-d3-tree';
import {ip} from "../../LandingPageComponents/JobView";

class OrgChart extends Component {
  constructor(props){
    super(props)
    this.state = {
      employees: null,
      orgChart: [{
        name: 'no employees found'
      }]
    }
    this.createChart = this.createChart.bind(this)
  }

  togglePopup() {
      console.log("TOGGLE")
      this.setState({
          showPopup: !this.state.showPopup,
          employees: []
      });
  }

  componentDidUpdate(prevProps, prevState) { // proof that the org chart updates to proper values
    console.log("UPDATED")
    console.log(this.state.orgChart)
    this.render()
  }

  componentDidMount(){ //when component is created, gets employees
		this.getEmployees()
	}

  createChart = async() =>{
    if (this.state.employees) {
      console.log("EMPLOYEES")
      //convert employee array to hash map of employees with key being managerId
      //in order to get easy access to each group of children and build chart from there
      var empMap={};
      //puts CEO in first spot in table
      empMap[0]=[this.state.employees[0]];
      var i;
      //goes through employees putting them in hash table sorted by managerID
      for(i=1; i<this.state.employees.length; i++){
        //if there aren't any employees at that index yet, make new array there
        if(typeof empMap[this.state.employees[i].managerId] =='undefined'){
          empMap[this.state.employees[i].managerId]=[this.state.employees[i]];
        }
        //otherwise there's other employees there already and we can add to it
        else {
          empMap[this.state.employees[i].managerId].push(this.state.employees[i]);
        }
      }
    //console.log(empMap);
    var chart;
    var currEmp=empMap[0];

    async function buildChart(instance, managerId, empMap){ // recursive function to add nodes to chart
      //console.log(empMap)
      let nodes = []
      if(typeof empMap[managerId] == 'undefined'){
        return
      }
      var all_children
      console.log(empMap[managerId])
      for(var i=0; i< empMap[managerId].length; i++){
        all_children = await buildChart(instance, empMap[managerId][i].employeeId, empMap) //waits for recursive value
        let node = {
          name: empMap[managerId][i].lastName,
		  attributes: {
			  Position: empMap[managerId][i].positionTitle,
			  Email: empMap[managerId][i].email,
			  ID: empMap[managerId][i].employeeId,
		  },
          children: all_children
        }
        nodes.push(node)
      }
      return nodes
    }

    //build org chart based on hash map
    //hard coded first couple of levels for now
    chart = await buildChart(this, 0, empMap) // waits for value before moving on to next part
    this.setState({orgChart: chart})
  }}

	//gets employees for given company sorted by managerID to get CEO first
	getEmployees = async () => {
		let res = await axios.put('http://'+ip+':3001/getEmployee',{"companyID":this.props.compID});
		let {data} = await res.data;
		//console.log(data);
		this.setState({employees: data})
    this.createChart()
	};

  render() {
    if(this.state.employees && this.state.orgChart && this.state.orgChart.length > 0){
      return (
          //React graph to build org chart
          <div>
                  <div className='popup'>
                      <div className='popup_inner'>
                          <div id="treeWrapper" >
							<div id="orgChart">
								<Tree
									data={this.state.orgChart}
									orientation={'vertical'}
								/>

							</div>
                          </div>
                          <button id ="closeButton" onClick={this.props.closePopup}>Close</button>
                      </div>
                  </div>
          </div>

      );}
    else{ //calls when there are no employees
      return (<div>
      <h1> Loading </h1>
      </div>)
    }
  }
}

export default OrgChart;
