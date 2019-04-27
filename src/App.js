import React, { Component } from 'react';

import './App.css';
import Drinks from './Drinks.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

// import axios from 'axios';
// import './configure.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: 0,
      user: null,
    }
  }

  setUser = (user) => {
    this.setState({
      user: user,
    })
  }

  render() {
    let { screen } = this.state;
    let display;

    switch (screen) {
      case 0:
        display = <Login setUser={this.setUser} />;
        break;
      case 1:
        display = <Signup />;
        break;
      case 2:
        display = <Drinks />
        break;
    }

    return (
      <div>
        {display}
      </div>
    );
  }
}

export default App;
