import React, { Component } from 'react';
import axios from 'axios';

export default class ViewUser extends Component {
  constructor(props) {
    super(props);

    this.onEditUser = this.onEditUser.bind(this);
    this.onDeleteUser = this.onDeleteUser.bind(this);
    this.state = { user: {}};

  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          user: response.data,
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  
  onEditUser(id) {
    window.location = '/user/edit/'+id;
  }

  onDeleteUser(id) {
    var confirmation = window.confirm("Are you sure you want to delete " + this.state.user.username + " profile? \n\n Press 'Yes' to confirm or 'Cancel' to cancel.");
    if (confirmation === true) {
      axios.delete('http://localhost:5000/users/'+id)
      }
      window.location = '/user/add';
    }

  render() {
    return (
      <div>
        <h3>Hello {this.state.user.username} !</h3>
        <div className="form-group"> 
          <h2>Gender: {this.state.user.gender}</h2>
          <h2>Age: {this.state.user.age}</h2>
          <h2>Weight: {this.state.user.weight}</h2>
          <h2>Height: {this.state.user.height}</h2>
          <h2>Unit: {this.state.user.unit}</h2>
          </div>
        <div className="form-group">
          <h2>BMI Score: {this.state.user.bmi}</h2>
          <h2>BMI Category: {this.state.user.bmiCategory}</h2>
        </div>
        <div className="form-group">
          <h2>Basal Metabolic Rate: {this.state.user.bmr}</h2>
          <h2>Acitivity Level: {this.state.user.activity}</h2>
          <h2>Daily Calories (to maintain weight): {this.state.user.dailycalories}</h2>
          <h2>Daily Calories (to lose weight): {this.state.user.dailycalories - 500}</h2>
          <h2>Daily Calories (to gain weight): {this.state.user.dailycalories + 500}</h2>
        </div>
        <div className="form-group">
          <button type="button" onClick={() => this.onEditUser(this.state.user._id)}>Edit User</button>
          <button type="button" onClick={() => this.onDeleteUser(this.state.user._id)}>Delete User</button>
        </div>
      </div>
    )
  }
}