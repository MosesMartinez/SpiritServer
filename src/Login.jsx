import React, { Component } from 'react';
import './login-signup.css'
import axios from 'axios';
// import { connect } from "react-redux";
// import { setToken } from "./actions/tokenActions";

// const mapStateToProps = state => {
//     return { token: state.token };
// };
// function mapDispatchToProps(dispatch) {
//     return {
//         setToken: (token) => dispatch(setToken(token)),
//     };
// }


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: null,
        }

    }

    setMessage = (message) => {
        this.setState({
            message: message,
        });

        setTimeout(() => {
            this.setState({
                message: null,
            });
        }, 3000)
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
        let { email, password } = this.state;
        axios.post('/api/users', {
            email: email,
            password: password,
        })
            .then(res => {
                this.props.setToken(res.data.token);
                this.props.setDisplay(parseInt('2'));
            })
            .catch(err => {
                console.log(err);
                this.setMessage('Invalid email/password');
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
                <div className="row mt-2">
                    <div className="col-sm mt-3 text-danger h2 text-center">
                        {this.state.message}
                    </div>
                </div>
            </div>
        )
    }

}
export default Login;
//export default connect(mapStateToProps, mapDispatchToProps)(Login);