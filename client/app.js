import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({username: event.target.username, password: event.target.password});
  }

  handleSubmit(event) {
    fetch()
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          username:
          <input type="text" value={this.state.username} onChange={this.handleChange}/>
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

export default App;
