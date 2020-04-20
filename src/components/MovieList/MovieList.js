import React, { Component } from 'react';
//Connect to the redux store
import { connect } from 'react-redux';
//Import to do routing
import Movie from '../Movie/Movie';

export class MovieList extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_MOVIES' });
    }

    render() {
        return (
            <>
            <p>Niu</p>
                <section className="movies">
                    {this.props.movies.map(movie =>
                        <Movie key={movie.id} movie={movie} />
                    )}
                </section>

            </>
        )
    }
}
const putPropsOnReduxStore = (reduxStore) => ({
    movies: reduxStore.movies,
});



export default connect(putPropsOnReduxStore)(MovieList);