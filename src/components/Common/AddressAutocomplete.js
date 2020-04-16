import React from 'react';
import './AddressAutocomplete.css';

const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

class AddressAutocomplete extends React.Component {

    initializeAutocomplete() {
        // gets function from props from Register component
        let handleChangeAutocomplete = this.props.handleChangeAutocomplete;

        // grabs the input element where the autocomplete will be
        let input = document.getElementById('addressField');
        
        // pull only the address from google
        let options = {
            types: ['address']
        };

        // grabs the google global variable
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

    componentDidMount () {
        // uses global variable (googleMapsIncluded) to prevent the script element from being created multiple times
        let googleMapsIncluded = window.googleMapsIncluded;
        if (!googleMapsIncluded) {
            // creates a script tag
            const script = document.createElement("script");
            // assigns the address of the google autocomplete api 
            script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
            // tells the browser that it can load the script asynchronously
            script.async = true;
            // when the script has been loaded, call the function initializeAutocomplete
            script.onload = () => this.initializeAutocomplete();

            // adds the script tag to the html
            document.body.appendChild(script);
        } else {
            this.initializeAutocomplete();
        }

        window.googleMapsIncluded = true;
    }

    render () {
        return (
            <div>
                <input id="addressField" value={this.props.address} />
            </div>
        );
    }
}


export default AddressAutocomplete;