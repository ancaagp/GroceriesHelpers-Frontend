import React from 'react';
import Maps from './Maps';
import GroceriesAPI from '../../api/GroceriesAPI';
import HelpCardMain from './HelpCardMain';

class HomepageContainer extends React.Component {
    state = {
        groceries: [],
        selectedGrocery: null,
    }

    componentDidMount(){
        GroceriesAPI.index()
        .then(res => {
            this.setState({
                groceries: res.data
            });
        });
    }


    onSelectGrocery = (grocery) => {
        // allows only loggedin users to select grocery card
        if (this.props.userId) {
            this.setState({
                selectedGrocery: grocery
            });
        } 
    }

    onHelpSelected = () => {
        let selectedGrocery = this.state.selectedGrocery;
        selectedGrocery.helper = this.props.userId;
        GroceriesAPI.help(selectedGrocery)
        .then((res) => {
            let updatedGrocery = res.data;
            let groceries = this.state.groceries;
            let groceryIndex = groceries.findIndex(gro => gro._id === updatedGrocery._id);
            groceries[groceryIndex] = updatedGrocery;
            this.setState({groceries});
        });
    }

    componentDidUpdate(){
        console.log(this.state.groceries);
       console.log(this.props.userId)
    }

    render() {
        return (
            <>
            <div>
                <h2>Help your close ones</h2>
                <Maps 
                    location={this.props.location}
                    groceries={this.state.groceries}
                    selectedGrocery={this.state.selectedGrocery}
                    onSelectGrocery={this.onSelectGrocery}
                    userId = {this.props.userId}
                />
            </div>

            { this.state.selectedGrocery && this.props.userId &&
                <HelpCardMain 
                selectedGrocery={this.state.selectedGrocery}
                onHelpSelected={this.onHelpSelected}
                user = {this.state.user}
                />
            }
            
                </>
        )
    }
}

export default HomepageContainer;