import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Workout Tracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="navbar-item">
          <Link to="/workout" className="nav-link">All Workouts</Link>
          </li>
          <li className="navbar-item">
          <Link to="/workout/add" className="nav-link">Log Workout</Link>
          </li>          
          <li className="navbar-item">
          <Link to="/routine/add" className="nav-link">Create Routine</Link>
          </li>
          <li className="navbar-item">
          <Link to="/exercise" className="nav-link">All Exercises</Link>
          </li>
          <li className="navbar-item">
          <Link to="/progression/add" className="nav-link">Create Progression</Link>
          </li>
          <li className="navbar-item">
          <Link to="/exercise/add" className="nav-link">Create Exercise</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user/add" className="nav-link">Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}