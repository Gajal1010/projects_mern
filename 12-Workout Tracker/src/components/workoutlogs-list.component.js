import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dateFormat from 'dateformat';

const WorkoutLog = props => (
  <tr>
    <td>{dateFormat(props.workoutlog.workoutdate, "mmmm dS, yyyy, h:MM:ss TT")}</td>
    <td>{props.workoutlog.routinename}</td>
    <td>{props.workoutlog.duration}</td>
    <td>{props.workoutlog.username}</td>
    <td>
      <Link to={"/workout/edit/"+props.workoutlog._id}>edit</Link> | <a href="#" onClick={() => { props.deleteWorkoutLog(props.workoutlog._id) }}>delete</a>
    </td>
  </tr>
)

export default class WorkoutLogList extends Component {
  constructor(props) {
    super(props);

    this.deleteWorkoutLog = this.deleteWorkoutLog.bind(this);
    this.state = {workoutlogs: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/workoutlogs/')
      .then(response => {
        this.setState({ workoutlogs: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteWorkoutLog(id) {
    axios.delete('http://localhost:5000/workoutlogs/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      workoutlogs: this.state.workoutlogs.filter(el => el._id !== id)
    })
  }

  workoutlogList() {
    return this.state.workoutlogs.map(currentworkoutlog => {
      return <WorkoutLog workoutlog={currentworkoutlog} deleteWorkoutLog={this.deleteWorkoutLog} key={currentworkoutlog._id}/>;
    })
  }  

  render() {
    return (
      <div>
        <h3>All Workouts</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Workout Date</th>
              <th>Routine Name</th>
              <th>Duration</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.workoutlogList() }
          </tbody>
        </table>
      </div>
    )
  }
}