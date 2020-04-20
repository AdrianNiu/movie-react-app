import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';

import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

import { HashRouter as Router } from 'react-router-dom';



// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchMoviesSaga);
    yield takeEvery('SELECTED', getSelectedSaga);
    yield takeEvery('EDIT_MOVIES', editMovieSaga);
}

function* fetchMoviesSaga(action) {
    console.log('In fetchMoviesSaga', action);
    try {
        const response = yield axios.get('/api/movie');
        console.log('movies from server', response.data);
        yield put({ type: 'SET_MOVIES', payload: response.data });
    } catch (error) {
        console.log('error with GET movies from server', error);
    }
}

function* editMovieSaga(action) {
    console.log('In editMovieSaga', action);
    try {
        yield axios.put(`/api/movie/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_MOVIE' });
    }
    catch (error) {
        console.log('Error on PUT from Server');
    }
};

function* getSelectedSaga(action) {
    console.log('In getSelectedSaga', action.payload);
    try {
        const response = yield axios.post(`/api/movie/details/${action.payload}`, action.payload);
        yield put({ type: 'SELECTED_MOVIE', payload: response.data });
        
    } catch (error) {
        console.log('error with POST selected movies from server', error);
    }
}


// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

const selectedReducer = (state = {}, action) => {
    console.log(action.payload);
    switch (action.type) {
        case 'SELECTED_MOVIE':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        selectedReducer,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><Router><App /></Router></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
