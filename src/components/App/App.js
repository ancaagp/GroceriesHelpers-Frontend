import React from 'react';
import jwt_decode from 'jwt-decode';
import setAuthHeader from '../../utils/setAuthHeader';
import Routes from '../../config/routes'
import UserApi from '../../api/UserAPI';
import Header from '../Header/Header';
import FooterBar from '../Footer/Footer';
import './App.css';

const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

class App extends React.Component {
  state = {
    user: '',
    id: '',
    lat: '',
    lng: '',
    errorLogin: null,
    errorRegister: null
  }

  static initializeGoogleLib(callbackGoogleLib) {
    if (window.google) {
      callbackGoogleLib();
    } else {
      // initializing google Lib
      const script = document.createElement("script");
      // assigns the address of the google autocomplete api 
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
      // tells the browser that it can load the script asynchronously
      script.async = false;
      // when the script has been loaded, call the function initializeAutocomplete
      script.onload = () => callbackGoogleLib();
      // adds the script tag to the html
      document.body.appendChild(script);
    }
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
      .catch(err  => {
        if (err) {
          this.setState({
            errorRegister: err.response.data.errorCode
          })
        }
      });
  }

  catch =(err) => {

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
    .catch(err => {
      if (err) {
        this.setState({
          errorLogin: err
        })
      }
    });
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
          errorLogin={this.state.errorLogin}
          errorRegister={this.state.errorRegister}
        />
        </div>
        {/* <FooterBar /> */}
      </div>
    )
  }
}

export default App;
