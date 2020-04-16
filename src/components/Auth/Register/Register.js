import React from 'react';
import AddressAutocomplete from '../../Common/AddressAutocomplete';

class Register extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    address: '',
    lat: '',
    lng: '',
    phoneNumber: '',
    email: '',
    password: '',
    password2: ''
  }

  handleChangeAutocomplete = (lat, lng, address) => {
      this.setState({
          lat,
          lng,
          address
      })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let newUser = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      lat: this.state.lat,
      lng: this.state.lng,
      phoneNumber: this.state.phoneNumber,
    }
    this.props.register(newUser);
    console.log(newUser);
  }

  render() {
    return(
      <div className="register">
        <form id="signup-form" onSubmit={this.handleSubmit}>
        <label>First name: 
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}>
            </input>
          </label>
          <label>Last name: 
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}>
            </input>
          </label>
          <label>Address: 
            <AddressAutocomplete 
                handleChangeAutocomplete={this.handleChangeAutocomplete}
                />
            {/* <input
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}>
            </input> */}
          </label>
          <label>Phone number: 
            <input
              type="text"
              name="phoneNumber"
              value={this.state.phoneNumber}
              onChange={this.handleChange}>
            </input>
          </label>
          <label>Email: 
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}>
            </input>
          </label>
          <br />
          <label>Password: 
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}>
            </input>
          </label>
          <br />
          <label>Re-enter Password: 
            <input
              type="password"
              name="password2"
              value={this.state.password2}
              onChange={this.handleChange}>
            </input>
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Register;