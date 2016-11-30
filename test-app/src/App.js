import React, { Component } from 'react';
import SignUpForm from './TeamSignUp';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInCheck: false
    };
    this.submitCallback = this.submitCallback.bind(this);
  }

  // If all the submitions are valid it will set signInCheck to true for display 
  submitCallback(event) {
    this.setState({
      signInCheck: true
    });
  }

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
          {this.state.signInCheck &&
            <div className="alert alert-success" role="alert">You have successfully signed up</div>
          }
          <SignUpForm submitCallback={this.submitCallback}/>
        </div>
      </div>
    );
  }
}

export default App;
