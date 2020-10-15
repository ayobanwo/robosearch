import React, {Component} from 'react';
import { connect } from 'react-redux'
import CardList from '../components/CardList'
// import {robots} from './robots';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
 
import { setSearchField, requestRobots } from '../action.js'

const mapStateToProps = state => {
	return{
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	} 
}

const mapDispatchToProps = (dispatch) =>{
	return{
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () =>   dispatch(requestRobots())
	} 
}

class App extends Component {

	componentDidMount() {
		this.props.onRequestRobots();
	}

	render(){	
		const { searchField, onSearchChange, robots } = this.props;
		const filteredRobots = robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return(
			<div className='tc'>
				<h1 className='f2'>RoboFriends</h1> 
				<SearchBox searchChange={onSearchChange}/>
				<Scroll>
					<CardList robots={filteredRobots} />					
				</Scroll>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);