import React, { Component } from 'react';
import axios from 'axios';
import TableScrollbar from 'react-table-scrollbar';

const Exercise = props => (
    <tr>
      <td>{props.exercise.exercisename}</td>
      <td>{props.exercise.discription}</td>
      <td>{(props.exercise.progressionId) ? "" : "Yes"}</td>
      <td>
        <a href="#" onClick={() => { props.addExercise(props.exercise._id) }}>Add</a>
      </td>
    </tr>
)

const SelectedExercise = props => (
    <tr>
      <td>{props.exercise.exercisename}</td>
      <td>{props.exercise.discription}</td>
      <td>{(props.exercise.progressionId) ? "" : "Yes"}</td>
      <td>
        <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</a>
      </td>
    </tr>
)

export default class CreateProgression extends Component {
  constructor(props) {
    super(props);

    this.onChangeProgName = this.onChangeProgName.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeDiscription = this.onChangeDiscription.bind(this);
    this.addExercise = this.addExercise.bind(this);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.allExerciseList = this.allExerciseList.bind(this);
    this.selectedExerciseList = this.selectedExerciseList.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        progname: '',
        category: 'Strength',
        discription: '',
        exercises: [],
        allexercises: [],
        selectedexercises: [],
        userId: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
    .then(response => {
      if (response.data.length > 0) {
        this.setState({
          allexercises: response.data,
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onChangeProgName(e) {
    this.setState({
        progname: e.target.value
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

  addExercise(id){
    const exercise = this.state.allexercises.filter(el => el._id === id);
    this.setState({
        exercises: this.state.exercises.concat(id),
        selectedexercises: this.state.selectedexercises.concat(exercise),
        allexercises: this.state.allexercises.filter(el => el._id !== id)
    })
  }

  deleteExercise(id){
    const exercise = this.state.selectedexercises.filter(el => el._id === id);
    this.setState({
        exercises: this.state.exercises.filter(el => el._id !== id),
        allexercises: this.state.allexercises.concat(exercise),
        selectedexercises: this.state.selectedexercises.filter(el => el._id !== id)
    })
  }

  allExerciseList() {
    return this.state.allexercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} addExercise={this.addExercise} key={currentexercise._id}/>;
    })
  }

  selectedExerciseList() {
    if (this.state.selectedexercises.length > 0) {
        return this.state.selectedexercises.map(currentexercise => {
        return <SelectedExercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
    } else {
        console.log(this.state.selectedexercises.length);
    }
  }

  onSubmit(e) {
    e.preventDefault();
  
    const progression = {
      progname: this.state.progname,
      category: this.state.category,
      discription: this.state.discription,
      exercises: this.state.exercises,
      userId: this.state.userId, 
    };
  
    console.log(progression);

    axios.post('http://localhost:5000/progressions/add', progression)
      .then(res => console.log(res.data));
    
    //window.location = '/progression';
  }

  render() {
    return (
      <div>
        <h3>Create New Progression</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Progression Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.progression}
                onChange={this.onChangeProgName}
                />
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
            <label>Available Exercises: </label>
            <TableScrollbar rows={5}>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Exercise Name</th>
                    <th>Discription</th>
                    <th>Progression</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.allExerciseList() }
                </tbody>
            </table>
            </TableScrollbar>
          </div>
          <div className="form-group">
            <label>Selected Exercises: </label>
            <TableScrollbar rows={5}>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Exercise Name</th>
                    <th>Discription</th>
                    <th>Progression</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.selectedExerciseList() }
                </tbody>
            </table>
            </TableScrollbar>
          </div>
          <div className="form-group">
            <input type="submit" value="Create Progression" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}