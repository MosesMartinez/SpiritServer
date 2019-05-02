import React, { Component } from 'react';
//import { connect } from "react-redux";
//import { setToken } from "./actions/tokenActions";
import './App.css';
import Drinks from './Drinks.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';



// const mapStateToProps = state => {
//   return {token: state.usertoken.token };
// }

// function mapDispatchToProps(dispatch) {
//   return {setToken: (token) => dispatch(setToken(token))};
// }
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: 'e7234b54fb42fc899bdf7397b3579eebe9dfcf1d',
      screen: 2,
      user: null,
    }
  }

  setUser = (user) => {
    this.setState({
      user: user,
    })
  }
  setToken = (token) =>{
    console.log("Token from child: " + token);
    this.setState({
      token: token,
    });
  }
  setDisplay = (display) =>{
    console.log("Display from child: " + display);
    this.setState({
      screen: display,
    })
  }

  render() {
    let { screen } = this.state;
    let display;

    // eslint-disable-next-line default-case
    switch (screen) {
      case 0:
        display = <Login setToken={this.setToken} setDisplay={this.setDisplay} />;
        break;
      case 1:
        display = <Signup />;
        break;
      case 2:
        display = <Drinks userToken={this.state.token}/>
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
//export default connect(mapStateToProps, mapDispatchToProps)(App);
