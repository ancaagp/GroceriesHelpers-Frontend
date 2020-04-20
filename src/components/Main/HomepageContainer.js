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
                <h3>Help your community</h3>

                <div className="section white howTo">
                    <div className="row container howToContainer">

                            <div className="col s12 m4">
                                <div className="home z-depth-0.1">
                                    <div className="card-content white-text howTo">
                                        <span className="card-title">1.</span>
                                        <p>
                                           Browse cards on the map and find the one you can help with based on number of items or location.
                                        </p>
                                    </div>
                                </div>
                            </div>


                            <div className="col s12 m4">
                                <div className="home z-depth-0.1">
                                    <div className="card-content white-text howTo">
                                        <span className="card-title">2.</span>
                                        <p>
                                            Contact the person who needs help with grocery shopping via email or phone number found on the card.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col s12 m4">
                                <div className="home z-depth-0.1">
                                    <div className="card-content white-text howTo">
                                        <span className="card-title">3.</span>
                                        <p>
                                            Once you commit to helping, select 'I will help' on the card. This will make the card unavailable to other helpers.
                                        </p>
                                </div>
                            </div>



                        </div>


                    </div>
                </div>


                <div className="maps1">
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
                            <Button flat modal="close" node="button" onClick={this.onCancelHelp} waves="green">Maybe next time</Button>,
                            <Button flat modal="close" node="button" onClick={this.onConfirmHelp} waves="green">I will help now</Button>
                        ]}
                        bottomSheet={false}
                        fixedFooter={false}
                        header="Please confirm"
                        open={true}
                        options={{ dismissible: false }}
                        root={document.getElementById('root')}
                    >
                        Please confirm you can help with the following list: {this.state.selectedGrocery.groceries}. Once you confirm, this request will be set to 'In progress' and won't be available to new helpers.
                    </Modal>
                }

            </>
        )
    }
}

export default HomepageContainer;