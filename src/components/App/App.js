import React from 'react';
import jwt_decode from 'jwt-decode';
import setAuthHeader from '../../utils/setAuthHeader';
import Routes from '../../config/routes'
import UserApi from '../../api/UserAPI';
import Header from '../Header/Header';
import FooterBar from '../Footer/Footer';
// import { Route, Link, Switch, withRouter } from 'react-router-dom';
import './App.css';

class App extends React.Component {
  state = {
    user: '',
    id: '',
    lat: '',
    lng: ''
  }

  componentDidMount() {
    // if there's a token in local storage
    if (localStorage.jwtToken) {
      // set the auth header to the token
      setAuthHeader(localStorage.jwtToken);
      // decode the token
      const decoded = jwt_decode(localStorage.getItem('jwtToken'));
      // set the state to the decoded token properties
      this.setState({
        user: decoded.email,
        id: decoded._id,
        lat: decoded.lat,
        lng: decoded.lng
      });
    }
  }

  register = (user) => {
    UserApi.register(user)
      .then(res => {
        if (res.status === 200) {
          // get the token from the response
          const token = res.data.token;
          // set the token to local storage
          localStorage.setItem('jwtToken', token);
          // set the auth header to the token
          setAuthHeader(token);
          // decode the token
          const decoded = jwt_decode(token);
          // set the state to the decoded user information
          this.setState({
            user: decoded.email,
            id: decoded._id,
            lat: decoded.lat,
            lng: decoded.lng
          })
        }
      })
      .catch(err => console.log(err));
  }

  login = (user) => {
    UserApi.login(user)
    .then(res => {
      if (res.status === 200) {
        // get the token from the response
        const token = res.data.token;
        // set the token to local storage
        localStorage.setItem('jwtToken', token);
        // set the auth header to the token
        setAuthHeader(token);
        // decode the token
        const decoded = jwt_decode(token);
        // set the state to the decoded user information
        this.setState({
          user: decoded.email,
          id: decoded._id,
          lat: decoded.lat,
          lng: decoded.lng
        })
      }
    })
    .catch(err => console.log(err));
  }

  logout = () => {
    // delete the token from localStorage
    localStorage.removeItem('jwtToken');
    // remove the header from being sent in requests
    // passing it no value will make its logic falsy, which will remove the header
    setAuthHeader();
    // remove the user info from state so the re-render will log them out and change the HTML header automatically
    this.setState({
      user: '',
      id: '',
      lat: '',
      lng: ''
    })
  }

  render() {
    return (
      <div id='app' className='app'>
        <Header 
          logout={this.logout}
          user={this.state.user}
        />
        <div className="main">
        <Routes
          user={this.state.user}
          userId={this.state.id}
          location={{lat: this.state.lat, lng: this.state.lng}}
          login={this.login}
          register={this.register}
        />
        </div>
        <FooterBar />
      </div>
    )
  }
}

export default App;
