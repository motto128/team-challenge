import React, { Component } from 'react';
import SignUpForm from './TeamSignUp';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Sign UP</h2>
        </div>
        <p className="App-intro">
          To get started, sign up today for a free 30 day trial.
        </p>
        <div>
          <SignUpForm />
        </div>
      </div>
    );
  }
}

export default App;
