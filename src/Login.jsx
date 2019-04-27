import React, { Component } from 'react';
import './login-signup.css'
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: null,
        }

    }

    emailHandler = (e) => {
        this.setState({
            email: e.target.value,
        });
    }

    passwordHandler = (e) => {
        this.setState({
            password: e.target.value,
        });
    }

    submitHandler = (e) => {
        console.log("Submitted");

        let { email, password } = this.state;
        axios.post('./login', {
            email: email,
            password: password,
        })
            .then(res => {
                if (res.data.valid == true) {
                    this.setState({
                        message: null,
                    })
                    this.props.setUser(res.data.token);;
                }
            })
            .catch(err => {
                console.log(err);
            });

        e.preventDefault();
    }

    render() {
        return (

            <div className="container mt-5 p-5 border rounded">
                <div className="row">
                    <div className="col-sm text-center h2">
                        Login
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-sm">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
                            </div>
                            <input type="text" value={this.state.email} onChange={this.emailHandler} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-sm">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
                            </div>
                            <input type="password" value={this.state.password} onChange={this.passwordHandler} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-sm">
                        <button type="submit" onClick={this.submitHandler} className="btn btn-primary btn-lg float-right">Login</button>
                    </div>
                </div>
            </div>
        )
    }

}
export default Login;