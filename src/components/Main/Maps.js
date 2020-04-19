import React from 'react';
import { Row, Col, Card, Icon, Button } from 'react-materialize';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import LabelConversion from '../Common/LabelConversion';
import Moment from 'moment';
import App from '../App/App';

const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const style = {
  width: '100%',
  height: '60%'
}

class MapContainer extends React.Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedGrocery: {},
    userCenterLat: null,
    userCenterLng: null,
    googleLib : null
  };

  componentDidMount() {
    this.setState({
      userCenterLat: this.props.location.lat,
      userCenterLng: this.props.location.lng,
      googleLib: window.google
    });

    if (navigator.geolocation) {
      let mapsReactComponent = this;
      navigator.geolocation.getCurrentPosition(function (position) {
        mapsReactComponent.setState({
          userCenterLat: position.coords.latitude,
          userCenterLng: position.coords.longitude
        });
      });
    }

    if (!this.state.googleLib) {
      App.initializeGoogleLib(() => {
        this.setState({googleLib: window.google});
      });
    }

  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedGrocery: props.grocery,
      activeMarker: marker,
      showingInfoWindow: true
    });
    this.props.onSelectGrocery(props.grocery)
  }


  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  getIconMarker(grocery) {

    const icon = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    const icon2 = "https://img.icons8.com/color/30/000000/fruit-bag.png"
    const icon3 = "https://img.icons8.com/color/48/000000/grocery-bag.png"

    if (grocery.status === '1') {
      return icon3;
    } else if (grocery.status === '2') {
      return icon2;
    } else {
      return icon;
    }

  }

  
  render() {

    let groceries = this.props.groceries;
    return (
      <div>

      <Map 
        google={this.state.googleLib} 
        style={style} 
        zoom={14}
        className="maps"
        center={{ lat: this.state.userCenterLat, lng: this.state.userCenterLng }}
      >

        {groceries && groceries.map(grocery => {
          return <Marker
            icon={this.getIconMarker(grocery)}
            onClick={this.onMarkerClick}
            grocery={grocery}
            title={grocery._id}
            key={grocery._id}
            position={{ lat: grocery.lat, lng: grocery.lng }}
          />
        })
        }

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>

          
          {/* Card modal on marker */}

          <div>
            <div className="card white darken-1 z-depth-0">
              <div className="card white darken-1 z-depth-0 card-content">
                <h6>{this.state.selectedGrocery.groceries}</h6>
                <p>{`I need these groceries: ${LabelConversion.getTimeline(this.state.selectedGrocery.timeline)}`}</p>
                <p>{`Status: ${LabelConversion.getStatus(this.state.selectedGrocery.status)}`}</p>
                <br />
                <p>Created on: {Moment(this.state.selectedGrocery.createdAt).format("MMMM Do YYYY, HH:mm")}</p>
              </div>
              { !this.props.userId &&
              <div className="card-action">
                <a href="/login">Please login to help this person</a>
              </div>
  }
            </div>
          </div>


        </InfoWindow>
      </Map>
      </div>
    );
  }
}

export default MapContainer;
