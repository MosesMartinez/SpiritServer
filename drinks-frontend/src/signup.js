import React, { Component } from 'react';
import './login-signup.css';
import axios from 'axios';

class signup extends Component{

    constructor(props){
        super(props);
        this.state ={

            Email: '',
            Password: '',
            ConfirmPswrd: '',
            PswrdError: false,
            UserId: '',
        }

    }

    registerUser = () => {
        let {Password, ConfirmPswrd, PswrdError, Email} = this.state;
        if(Password === ConfirmPswrd){
            console.log(Password + ConfirmPswrd)
            // axios.post('/signup', {
            //     params:{
            //         email: this.state.Email,
            //         password: this.state.Password,
            //     }
            // })
            axios.post(`/signup?email=${Email}&password=${Password}`)
            .then((networkresponse) =>{
               let userId = networkresponse.data;
               this.setState({
                   UserId: userId,
               })
            })
        }
        else{
            PswrdError = true;
            console.log("Password do not match " + PswrdError);
        }
        

    }

    render(){
        return(
            <div className="SignUpFrame">
                {this.state.UserId}
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
                Confirm Password
                <span style = {{display: 'block'}}>
                <input type='password' value= {this.state.ConfirmPswrd} onChange={(e) => {
                this.setState({ ConfirmPswrd: e.target.value })
                }}/>
                </span>
                <button onClick={this.registerUser}>Register</button>
            </div>
        )
    }

}
export default signup;