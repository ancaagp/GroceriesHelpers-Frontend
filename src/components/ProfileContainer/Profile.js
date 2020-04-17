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

  shouldComponentUpdate (nextProps, nextState) {

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
        <div className="card blue-grey darken-1">


          {/* is editing */}
          {this.state.isEditing && (
            <>
              <div className="card-content white-text">
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
                  <label>
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
                <button
                  id="btnEdit"
                  className="waves-effect waves-light btn btnEdit"
                  onClick={this.toggleEditForm}
                >
                  Cancel
                </button>
                <div className="divider" />
                <button
                  className="waves-effect waves-light btn btnEdit"
                  onClick={this.submitEdit}
                >
                  Save
                </button>
              </div>
            </>
          )}


          {/* is editing */}
{!this.state.isEditing && (
  <>
          <div className="card-content white-text">
          <span className="card-title"> About me</span>
          <ul className="about">
            <li>
              {this.props.user.firstName} {this.props.user.lastName}
            </li>
            <li> {this.props.user.intro}</li>
            <li>
              Join date: {Moment(this.props.user.createdAt).format("MMMM Do YYYY")}
            </li>

            <h6>Contact information</h6>
{/* 
            <table>
              <tr>
                <td>
                  <p>{this.props.email}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>{this.props.user.intro}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <i className="material-icons">email</i>
                </td>

                <td>
                  <p>{this.props.user.email}</p>
                </td>
              </tr>
              <tr>
              <td>
                <p><i className="material-icons">add_location</i>{this.props.user.address}</p>
              </td>
              </tr>

              <tr>
                <td>
                  <p> <i className="material-icons">phone</i>{this.props.user.phoneNumber}</p>
                </td>
              </tr>
            </table> */}


            <li>{this.props.email}</li>
                   <li>  <i className="material-icons">email</i>{this.props.user.email}</li>
                   <li>  <i className="material-icons">add_location</i>{this.props.user.address}</li>
                   <li>  <i className="material-icons">phone</i>{this.props.user.phoneNumber}</li>
          </ul>
        </div>



        <div className="card-action">
          <a
            className="waves-effect waves-light btn"  onClick={this.toggleEditForm}
          >
            Edit
                  </a>
          {/* <a class="waves-effect waves-light btn">Delete</a> */}
        </div>

</>

)}


        </div>
      </div>
    )
  }
}

export default Profile;