import React from 'react';
import Login from './Login/Login';
import Register from './Register/Register';
import './LoginRegister.css';

class LoginRegister extends React.Component {
    render() {
        return (
            <>
        <div className="section white">
          <div className="row container">
                    <div className = "loginRegister">
                    <h5>Please login or register for a new account to be able to add requests or help with groceries.</h5>
                    <div className="col s12 m6">
                        <div className="card home">
                            <div className="card-content white-text">
                                <span className="card-title">Login</span>
                                <Login
                                    login={this.props.login} 
                                    errorLogin={this.props.errorLogin}
                                    />
                            </div>
                        </div>
                    </div>

                    <div className="col s12 m6">
                        <div className="card home">
                            <div className="card-content white-text">
                                <span className="card-title">Create a new account</span>
                                <Register
                                    register={this.props.register} 
                                    errorRegister={this.props.errorRegister}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </>
        )
    }
}

export default LoginRegister;