import React, { Component } from 'react';
//Connect to the redux store
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

export class Movie extends Component {

    // state = {
    //     id: '',
    // }

    handleClick = (movieId) => {
        console.log('Movie Selected', this.props.movie.id, movieId);
        this.props.dispatch({ type: 'SELECTED', payload: { movieId } });
        this.props.history.push('/details');
    }

    // handleChange = (event) => {
    //     console.log('Category changed to', event.target.value);
    //     this.setState({
    //         category: event.target.value,
    //     })
    // }
    // delete = (id) => {
    //     this.props.dispatch({ type: 'DELETE_FAV', payload: id })
    // }
    // setCategory(category) {
    //     if (category === null) {
    //         return <p>Category:</p>
    //     }
    //     else {
    //         return <p>Category: {category}</p>
    //     }
    // }

    render() {
        return (
            <div>
                <h1>Movies</h1>
                <img src={this.props.movie.poster} alt="MoviePoster" onClick={() => this.handleClick(this.props.movie.id) }/>
                {/* <p>{this.props.favorite.category}</p>
                <div className="category">
                    {this.setCategory(this.props.favorite.name)}
                    <label htmlFor="category"><button onClick={this.handleClick}>Set Category</button></label>
                    <select id="category" onChange={(event) => this.handleChange(event)}>
                        <option></option>
                        <option value="1">Funny</option>
                        <option value="2">Cohort</option>
                        <option value="3">Cartoon</option>
                        <option value="4">NSFW</option>
                        <option value="5">Meme</option>
 
                    </select>
                    <button onClick={(event) => this.delete(this.props.favorite.id)}>Remove Fav</button>
                </div> */}
            </div>
        )
    }
}

const putPropsOnReduxStore = (reduxStore) => ({
    movies: reduxStore.movies,
});

Movie = withRouter(Movie);
export default connect(putPropsOnReduxStore)(Movie);