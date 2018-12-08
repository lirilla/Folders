import React, { Component, PropTypes } from 'react'
import { DefaultRoute, Router, Switch, Route, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import Header from './components/Header'
import FolderPage from './components/FolderPage/FolderPage'
import FoldersPage from './components/FoldersPage/FoldersPage'
import Footer from './components/Footer'

class App extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="App">
				<Header />

				<Router history = {browserHistory}>
		        	<Route path='/' component = {FoldersPage} />
		        	<Route path='/folder/:id' component = {FolderPage }/>
		        </Router>
				
				<Footer />
			</div>
		)
	}
}

export default App