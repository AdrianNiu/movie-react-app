import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route} from 'react-router-dom';
// import { withRouter } from 'react-router';

import { connect } from 'react-redux';

import { withRouter } from 'react-router';

import MovieList from '../MovieList/MovieList';
import MovieDetail from '../MovieDetail/MovieDetail.js';


class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div>
        <p>Movie List!</p>
        <div>
          <Router>
            <Route exact path='/' component={MovieList} />
            <Route path='/details' component={MovieDetail} />
          </Router>
        </div>
      </div>
    );
  }
}

export default connect()(withRouter(App));
