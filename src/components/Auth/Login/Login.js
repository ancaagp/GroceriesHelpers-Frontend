import React from 'react';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.login(user);
  }

  render() {
    return(
      <div className="login">
        <form>
          <label>Email* 
            <input
              type="email"
              className="validate"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required>
            </input>
          </label>
          <br />
          <label>Password*
            <input
              type="password"
              className="validate"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required>
            </input>
          </label>
          <br />
          <p>
        <label className="required">*required</label>
        </p>
        <br />
        {this.state.email && this.state.password &&
          <a onClick={this.handleSubmit} className="btn-flat loginBtn" type="submit">Submit</a>
        }
        {!this.state.email && <input type="email"/> && !this.state.password &&
          <a onClick={this.handleSubmit} className="btn-flat loginBtn disabled" type="submit">Submit</a>
        }

        </form>
      </div>
    )
  }
}

export default Login;