import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import ImagesPage from '../../pages/ImagesPage';
import ImageDetailsPage from '../../pages/ImageDetailsPage';
import Loader from '../loader/Loader';
import './root.css';


class Root extends Component {
	render() {
		const { loading } = this.props;

		return (
			<Router>
				<div className="App">
					{ loading ? <Loader /> : null }
					<div className="App-header">
						<h2>Welcome to image tooltip manager</h2>
					</div>

					<Route exact path="/" render={() => <Redirect to="/images" /> } />
					<Route exact path="/images" component={ImagesPage} />
					<Route path="/images/:id" component={ImageDetailsPage} />
				</div>
			</Router>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		loading: state.uiState.loading
	}
};

export default connect(mapStateToProps)(Root);
