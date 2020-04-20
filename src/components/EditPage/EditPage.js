import React, { Component } from 'react';
//Connect to the redux store
import { connect } from 'react-redux';
//Import to do routing


export class EditPage extends Component {

    state = {
        id: this.props.selected.id,
        title: '',
        description: '',
        genre: ''
    };

    componentDidMount() {
        // this.props.dispatch({ type: 'SELECTED' });
    }

    enterMovieList = () => {
        this.props.history.push(`/`);
    }

    enterEdit = () => {
        this.props.history.push(`/edit`);
    }

    handleCancel = () => {
        // console.log(this.state);
        
        this.props.history.push(`/details`); 
    }

    handleSave = () => {
        console.log('Edits saved', this.state);
        this.props.dispatch({ type: 'EDIT_MOVIES', payload: this.state });
        // this.props.history.push(`/details/${this.state.id}`);
    }

    handleChange = (event, propertyName) => {
        console.log('Got an edit', propertyName, event.target.value)
        this.setState({
            ...this.state,
            [propertyName]: event.target.value,
        });
    }

    handleChangeGenre = genre => event => {
        console.log('genre selection', event.target.value);
        this.setState({
            genre: event.target.value
        });
    }

    render() {
        return (
            <>
                <p>Niu Edit Page</p>
                <section className="movies">


                    <div className="movie-detail">
                        <img src={this.props.selected.poster} alt="Movie poster" /> 
                        {this.props.selected.title}
                        {this.props.selected.description}
                        
                        {/* {JSON.stringify(this.props.selected)} */}
                        <button onClick={this.enterEdit}>Edit</button>
                        <button onClick={this.enterMovieList}>Back to Movie List</button>
                        <select value={this.state.genre} onChange={this.handleChangeGenre('genre')}>
                            <option value="" />
                            <option value={'Adventure'}>Adventure</option>
                            <option value={'Animated'}>Animated</option>
                            <option value={'Biographical'}>Biographical</option>
                            <option value={'Comedy'}>Comedy</option>
                            <option value={'Disaster'}>Disaster</option>
                            <option value={'Drama'}>Drama</option>
                            <option value={'Epic'}>Epic</option>
                            <option value={'Fantasy'}>Fantasy</option>
                            <option value={'Musical'}>Musical</option>
                            <option value={'Romantic'}>Romantic</option>
                            <option value={'Science Fiction'}>Science Fiction</option>
                            <option value={'Space-Opera'}>Space Opera</option>
                            <option value={'Super Hero'}>Super Hero</option>
                        </select>

                                <input onChange={(event) => this.handleChange(event, 'title')} value={this.state.title}></input>
                                <br />
                                <input onChange={(event) => this.handleChange(event, 'description')} value={this.state.description}></input>
                            
                                <button onClick={this.handleCancel}>Cancel</button>
                                <button onClick={this.handleSave}>Save</button>
                         
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



export default connect(putPropsOnReduxStore)(EditPage);