import fetch from 'isomorphic-fetch';
import React from 'react'; 
import Component from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.setState({username: event.target.username, password: event.target.password});
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          username:
          <input type="text" value={this.state.username} />
        </label>
        <label>
          password:
          <input type="text" value={this.state.password} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
