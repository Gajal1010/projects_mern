import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateWorkoutLog extends Component {
  constructor(props) {
    super(props);

    this.onChangeWorkoutDate = this.onChangeWorkoutDate.bind(this);
    this.onChangeRoutineName = this.onChangeRoutineName.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      workoutdate: new Date(),
      routinename: '',
      routines: [],
      duration: 0,
      username: '',
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
    .then(response => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map(user => user.username),
          username: response.data[0].username
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })

    axios.get('http://localhost:5000/routines/')
    .then(response => {
      if (response.data.length > 0) {
        this.setState({
          routines: response.data.map(routine => routine.routinename),
          routinename: response.data[0].routinename
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onChangeWorkoutDate(date) {
    this.setState({
      date: date
    });
  }

  onChangeRoutineName(e) {
    this.setState({
      routinename: e.target.value
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
  
    const workoutlog = {
      workoutdate: this.state.workoutdate,
      routinename: this.state.routinename,
      duration: this.state.duration,
      username: this.state.username,
    };
  
    console.log(workoutlog);

    axios.post('http://localhost:5000/workoutlogs/add', workoutlog)
    .then(res => console.log(res.data));

    window.location = '/workout';
  }

  render() {
    return (
      <div>
        <h3>Log Workout</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
            <label>Workout Date: </label>
            <div>
              <DatePicker
                selected={this.state.workoutdate}
                onChange={this.onChangeWorkoutDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                dateFormat="LLL"
              />
            </div>
          </div>
        <div className="form-group"> 
            <label>Routine Name: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.routinename}
                onChange={this.onChangeRoutineName}>
                {
                  this.state.routines.map(function(routine) {
                    return <option 
                      key={routine}
                      value={routine}>{routine}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.duration}
                onChange={this.onChangeDuration}
                />
          </div>
          <div className="form-group"> 
            <label>User: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group">
            <input type="submit" value="Log Workout" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}