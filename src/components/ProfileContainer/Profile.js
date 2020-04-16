import React from 'react';

class Profile extends React.Component {
    render () {
        return (
            <div id="profile-page-sidebar" className="col s12 m8">
            <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">About me</span>
                    <ul className="about">
                      <li>
                        {this.props.user.firstName} {this.props.user.lastName}
                      </li>
                      <li>{this.props.email}</li>
                      <li>{this.props.user.address}</li>
                      <li>
                        Join date:{" "}
                        {/* {Moment(this.props.user.createdAt).format("MMMM Do YYYY")} */}
                      </li>
                    </ul>
                  </div>
                  <div className="card-action">
                    <a
                      className="waves-effect waves-light btn"
                    >
                      Edit
                    </a>
                    {/* <a class="waves-effect waves-light btn">Delete</a> */}
                  </div>
            </div>
            </div>
        )
    }
}

export default Profile;