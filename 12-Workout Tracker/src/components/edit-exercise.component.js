import React, { Component } from 'react';
import axios from 'axios';

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeExercisename = this.onChangeExercisename.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeDiscription = this.onChangeDiscription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        exercisename: '',
        type: 'Repetition',
        category: 'Strength',
        discription: '',
        progressionId: '',
        username: '',
        userId: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          exercisename: response.data.exercisename,
          type: response.data.type,
          category: response.data.category,
          discription: response.data.discription,
          progressionId: response.data.progressionId,
          userId: response.data.userId
        })
        return axios.get('http://localhost:5000/users/'+response.data.userId);
      })
      .then(response => {
        this.setState({
          username: response.data.username
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeExercisename(e) {
    this.setState({
      exercisename: e.target.value
    })
  }

  onChangeType(e) {
    this.setState({
        type: e.target.value
    });
  }

  onChangeCategory(e) {
    this.setState({
        category: e.target.value
    });
  }

  onChangeDiscription(e) {
    this.setState({
        discription: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      exercisename: this.state.exercisename,
      type: this.state.type,
      category: this.state.category,
      discription: this.state.discription,
      progressionId: this.state.progressionId,
      userId: this.state.userId,
    };

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));
      console.log('Exercise Updated!');

    window.location = '/exercise';
  }

  render() {
    return (
    <div>
      <h3>Edit Exercise</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Exercise Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.exercisename}
              onChange={this.onChangeExercisename}
              />
        </div>
        <div className="form-group">
          <label>Type: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.type}
              onChange={this.onChangeType}>
                  <option value="Repetition">Repetition</option>
                  <option value="Duration">Duration</option>
          </select>
        </div>
        <div className="form-group">
          <label>Category: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.category}
              onChange={this.onChangeCategory}>
                  <option value="Strength">Strength</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Mobility">Mobility</option>
                  <option value="Others">Others</option>  
          </select>
        </div>        
        <div className="form-group">
          <label>Discription: </label>
          <input 
              type="textarea" 
              className="form-control"
              value={this.state.discription}
              onChange={this.onChangeDiscription}
              />
        </div>
        <div className="form-group">
          <label>User: </label>
          <p>{this.state.username}</p>
        </div>
        <div className="form-group">
          <input type="submit" value="Edit Exercise" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}