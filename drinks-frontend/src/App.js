import React, { Component } from 'react';
import './App.css';
import Drinks from './drinks';
import Login from './login';
import SignUp from './signup';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Login />
        <SignUp />
        <Drinks />
      </div>
    );
  }
}

export default App;
