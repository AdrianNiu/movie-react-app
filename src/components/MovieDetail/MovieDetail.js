import React, { Component } from 'react';
//Connect to the redux store
import { connect } from 'react-redux';
//Import to do routing


export class MovieDetail extends Component {

    componentDidMount() {
        // this.props.dispatch({ type: 'FETCH_MOVIES' });
    }

    enterMovieList = () => {
        this.props.history.push(`/`);
    }

    render() {
        return (
            <>
                <p>Niu Detail Page</p>
                <section className="movies">
                <button onClick={this.enterMovieList}>Back to Movie List</button>

                    <div className="movie-detail">
                        {/* <img src={this.props.selected.poster} alt="Movie poster" /> {this.props.selected.description} */}
                        {JSON.stringify(this.props.selected)}
                    </div>
                </section>

            </>
        )
    }
}
const putPropsOnReduxStore = (reduxStore) => ({
    movies: reduxStore.movies,
    selected: reduxStore.selectedReducer
});



export default connect(putPropsOnReduxStore)(MovieDetail);