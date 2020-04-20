import React from 'react';
import './AddressAutocomplete.css';
import App from '../App/App';

class AddressAutocomplete extends React.Component {

    componentDidMount() {
        // grabs the google global variable
        let google = window.google;

        if (google) {
            this.initializeAutoComplete();
        } else {
            App.initializeGoogleLib(() => this.initializeAutoComplete());
        }
    }

    initializeAutoComplete() {

        // gets function from props from Register component
        let handleChangeAutocomplete = this.props.handleChangeAutocomplete;

        // grabs the input element where the autocomplete will be
        let input = document.getElementById('addressField');

        // pull only the address from google
        let options = {
            types: ['address']
        };

        let google = window.google;
        // creates the autocomplete object
        let autocomplete = new google.maps.places.Autocomplete(input, options);
        // defines which fields we want. formatted address is the address
        // written nicely, geometry gives latitude and longitude
        autocomplete.setFields(["formatted_address", "geometry"]);

        // tells the autocomplete object to call this function
        // when the user selects an address from the dropdown of proposed addresses
    
        autocomplete.addListener('place_changed', function() {
            
            // reads the lat, lng and formatted address from the autocomplete object
            let place = autocomplete.getPlace();
            let lat = place.geometry.location.lat();
            let lng = place.geometry.location.lng();
            let formattedAddress = place.formatted_address;
            // passes the lat, lng and address up to Register component via handleChangeAutocomplete function
            handleChangeAutocomplete(lat, lng, formattedAddress);
        });
        window.autocomplete = autocomplete;
    }

    render () {
        return (
            <div>
                <input id="addressField" value={this.props.address} required             className="validate"/>
            </div>
        );
    }
}


export default AddressAutocomplete;