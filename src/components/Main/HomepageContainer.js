import React from 'react';
import Maps from './Maps';
import GroceriesAPI from '../../api/GroceriesAPI';
import HelpCardMain from './HelpCardMain';
import { Modal, Button } from 'react-materialize';

class HomepageContainer extends React.Component {
    state = {
        groceries: [],
        selectedGrocery: null,
        isHelpModal: false
    }

    componentDidMount() {
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

    onConfirmHelp = () => {
        let selectedGrocery = this.state.selectedGrocery;
        selectedGrocery.helper = this.props.userId;
        GroceriesAPI.help(selectedGrocery)
            .then((res) => {
                let updatedGrocery = res.data;
                let groceries = this.state.groceries;
                let groceryIndex = groceries.findIndex(gro => gro._id === updatedGrocery._id);
                groceries[groceryIndex] = updatedGrocery;
                this.setState({
                    groceries,
                    selectedGrocery: updatedGrocery,
                    isHelpModal: false
                });
            });
    }

    onCancelHelp = () => {
        this.setState({
            isHelpModal: false
        });
    }

    onHelpSelected = () => {
        this.setState({
            isHelpModal: true
        });
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
                        userId={this.props.userId}
                    />
                </div>

                {this.state.selectedGrocery && this.props.userId &&
                    <HelpCardMain
                        selectedGrocery={this.state.selectedGrocery}
                        onHelpSelected={this.onHelpSelected}
                        userId={this.props.userId}
                    />
                }

                {this.state.isHelpModal &&
                    <Modal
                        actions={[
                            <Button flat modal="close" node="button" onClick={this.onCancelHelp} waves="green">Cancel</Button>,
                            <Button flat modal="close" node="button" onClick={this.onConfirmHelp} waves="green">I want to Help!</Button>
                        ]}
                        bottomSheet={false}
                        fixedFooter={false}
                        header="Are you sure?"
                        open={true}
                        options={{ dismissible: false }}
                        root={document.getElementById('root')}
                    >
                        Are you sure you want to help: {this.state.selectedGrocery.groceries}?
                    </Modal>
                }


            </>
        )
    }
}

export default HomepageContainer;