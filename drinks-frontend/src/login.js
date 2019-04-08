import React, { Component } from 'react';
import './login-signup.css'
import axios from 'axios';

class login extends Component{

    constructor(props){
        super(props);
        this.state ={
            Email: '',
            Password: '',
            Authenticate: false,
        }

    }

    LoginUser = () => {
        let {Email, Password} = this.state;
        if(Email !== '' && Password !== ''){
        axios.post('./login', {
            params:{
                email: Email,
                password: Password,
            }
        })
    }
        else{
            console.log("Empty Forms")
        }

    }

    render(){
        return(
            <div className="LoginFrame">
                Email
                <span style = {{display: 'block'}}> 
                <input value= {this.state.Email} onChange={(e) => {
                this.setState({ Email: e.target.value })
                }}/>
                </span>
                Password
                <span style = {{display: 'block'}}>
                <input type='password' value= {this.state.Password} onChange={(e) => {
                this.setState({ Password: e.target.value })
                }}/>
                </span>
                <button onClick={this.LoginUser}>LOGIN</button>
            </div>
        )
    }

}
export default login;