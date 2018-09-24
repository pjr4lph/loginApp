import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import Accepted from './accepted.js';
import Denied from './denied.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      redirectPath: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(event) {
    console.log(event.target.value);
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    console.log(event.target.value);
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
// handlesubmit handles alot (maybe too much), it makes a fetch request to backend to
// seek authorization (that login credentials are correct) and either receives a status code
// of 200(OK) or 404(not found), and on either case it either sets the loggedIn val as true or false
// regardless of t/f this.redirectPath gets assigned ternary statement of a react router
// which in restrospect is superfluous because a whole component doesnt really need to directed to...
    event.preventDefault();

    const data = JSON.stringify({
      username: this.state.username,
      password: this.state.password
    });

    fetch('/submit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    })
    .then(response => {
      console.log('in then ', response.status);
      if (response.status === 200) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
        this.setState({redirectPath : [
          <Route exact path="*" render={() => (this.state.loggedIn ? (<Redirect to="/accepted"/>) : (<Redirect to="/denied"/>))}/>,
          <Route path="/accepted" component={Accepted}/>,
          <Route path="/denied" component={Denied}/>
        ]});

    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            username:
            <input type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
          </label>
          <label>
            password:
            <input type="text" value={this.state.password} onChange={this.handlePasswordChange}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.redirectPath}
      </div>
    );
  }
}

export default App;
