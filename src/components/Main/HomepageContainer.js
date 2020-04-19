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
                <h2>Help your close ones</h2>

                <div className="section white">
                    <div className="row container">
                        <div className="row">
                            <div className="col s12 m4">
                                <div className="card home">
                                    <div className="card-content white-text">
                                        <span className="card-title">Card Title</span>
                                        <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
                                    </div>
                                    <div className="card-action">
                                        <a className="linkHome" href="#">This is a link</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col s12 m4">
                                <div className="card home">
                                    <div className="card-content white-text">
                                        <span className="card-title">Offer help</span>
                                        <p>You can search on the map for open requests and their groceries list. If you can help someone, choose their list and ycontact them directly via email or phone number. </p>
                                    </div>
                                    <div className="card-action">
                                        <a className="linkHome" href="/offerhelp">Offer help</a>
                                    </div>
                                </div>
                            </div>

                            <div className="col s12 m4">
                                <div className="card home">
                                    <div className="card-content white-text">
                                        <span className="card-title">Find help</span>
                                        <p>You can create new requests for grocery shopping on your Profile page. The requests will be automatically shown on the map, based on the location provided. </p>
                                    </div>
                                    <div className="card-action">
                                        <a className="linkHome" href="/profile">Find help</a>
                                    </div>
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