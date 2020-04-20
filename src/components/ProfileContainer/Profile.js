import React from 'react';
import Moment from 'moment';
import AddressAutocomplete from '../Common/AddressAutocomplete';

class Profile extends React.Component {

  state = {
    isEditing: false,
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    intro: ''
  }

  shouldComponentUpdate(nextProps, nextState) {

    if (this.props.user.firstName !== nextProps.user.firstName ||
      this.props.user.lastName !== nextProps.user.lastName ||
      this.props.user.address !== nextProps.user.address ||
      this.props.user.phoneNumber !== nextProps.user.phoneNumber ||
      this.props.user.intro !== nextProps.user.intro
    ) {
      this.setState({
        firstName: nextProps.user.firstName,
        lastName: nextProps.user.lastName,
        address: nextProps.user.address,
        phoneNumber: nextProps.user.phoneNumber,
        intro: nextProps.user.intro
      });
    }
    return true;
  }


  toggleEditForm = () => {
    this.setState({
      isEditing: !this.state.isEditing,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeAutocomplete = (lat, lng, address) => {
    this.setState({
      lat,
      lng,
      address
    })
  }

  submitEdit = () => {
    let userUpdate = {
      id: this.props.user._id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      intro: this.state.intro
    };
    this.props.handleEdit(userUpdate);
    this.setState({
      isEditing: !this.state.isEditing,
    });
  };


  render() {
    return (
      <div id="profile-page-sidebar" className="col s12 m8">
        <div className="card about-card">


          {/* is editing */}
          {this.state.isEditing && (
            <>
              <div className="card-content white-text about">
                <form className="editProfile">
                  <label>
                    First name:
                    <input
                      type="text"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                    ></input>
                  </label>
                  <label>
                    Last name:
                    <input
                      type="text"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                    ></input>
                  </label>
                  <label>
                    About me:
                    <input
                      type="text"
                      name="intro"
                      value={this.state.intro}
                      onChange={this.handleChange}
                    ></input>
                  </label>
                  <label className="address-form">
                    Address:
                    <AddressAutocomplete
                      handleChangeAutocomplete={this.handleChangeAutocomplete}
                    />
                  </label>
                  <label>
                    Phone number:
                    <input
                      type="text"
                      name="phoneNumber"
                      value={this.state.phoneNumber}
                      onChange={this.handleChange}
                    ></input>
                  </label>
                </form>
                <a
                  className="linkEditProfile cancel" href="#"
                  onClick={this.toggleEditForm}
                >
                  CANCEL
                </a>
                <div className="divider" />
                <a
                  className="linkEditProfile save" href="#"
                  onClick={this.submitEdit}
                >
                  SAVE
                </a>
              </div>
            </>
          )}


          {/* is editing */}
          {!this.state.isEditing && (
            <>
              <div className="card-content white-text about">
                <span className="card-title"> About me</span>
                <ul className="about">
                  <li>
                    {this.props.user.firstName} {this.props.user.lastName}
                  </li>
                  <li> {this.props.user.intro}</li>
                  <li>
                    Join date: {Moment(this.props.user.createdAt).format("MMMM Do YYYY")}
                  </li>
                  <li>{this.props.email}</li>
                  <li>  <i id="text" className="material-icons">email</i>{this.props.user.email}</li>
                  <li>  <i className="material-icons">add_location</i>{this.props.user.address}</li>
                  <li>  <i className="material-icons">phone</i>{this.props.user.phoneNumber}</li>
                </ul>
              </div>
              <div className="card-action">
                <a
                  className="linkEditProfile" href="#" onClick={this.toggleEditForm}
                >
                  Edit
                  </a>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default Profile;