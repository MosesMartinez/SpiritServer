import React, { Component } from 'react';
import './App.css';
import Drinks from './Drinks.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Login />
        <Signup />
        <Drinks />
      </div>
    );
  }
}

export default App;
