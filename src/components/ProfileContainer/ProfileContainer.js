import React from 'react';
import HelpForm from './HelpForm';
import './Profile.css'
import { Modal, Button } from 'react-materialize';
import GroceriesAPI from '../../api/GroceriesAPI';
import Profile from './Profile';
import HelpCardList from './HelpCardList/HelpCardList';
import UserAPI from '../../api/UserAPI';
import FooterBar from '../Footer/Footer';
import '../Footer/Footer.css'

// This wrapper prevents the Modal from re-rendering
// Modal component from react-materialize stops working if its re-rendered (setState)
class ModalWrapper extends React.Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (<>
            {this.props.children}
        </>);
    }

}

class ProfileContainer extends React.Component {

    state = {
        user: {},
        myGroceries: [],
        myGroceriesHelper: [],
        isCompletedModal: false,
        isDeleteModal: false,
        groceryToComplete: null,
        groceryToDelete: null
    }

    submitButtonDelegate = {}

    componentDidMount() {
        UserAPI.getUser(this.props.userId)
            .then((res) => {
                this.setState({
                    user: res.data
                });
            })
            .catch((err) => {
                return err;
            });
        GroceriesAPI.getMyGroceries()
            .then((res) => {
                this.setState({
                    myGroceries: res.data.myGroceries,
                    myGroceriesHelper: res.data.myGroceriesHelper
                })
            });
    }


    handleEdit = (user) => {
        UserAPI.update(user)
            .then(res => {
                this.setState({
                    user: res.data
                })
            })
    }


    onCompleteSelected = (groceryToComplete) => {
        this.setState({
            isCompletedModal: true,
            groceryToComplete: groceryToComplete
        });
    }

    onCompleteConfirmed = () => {
        GroceriesAPI.complete(this.state.groceryToComplete)
            .then((res) => {
                let updatedGrocery = res.data;
                let groceries = this.state.myGroceries;
                let groceryIndex = groceries.findIndex(gro => gro._id === updatedGrocery._id);
                groceries[groceryIndex] = updatedGrocery;
                this.setState({ myGroceries: groceries, groceryToComplete: null, isCompletedModal: false });
            });
    }

    onCompleteCanceled = () => {
        this.setState({ groceryToComplete: null, isCompletedModal: false });
    }

    onCompleteSelected = (groceryToComplete) => {
        this.setState({
            isCompletedModal: true,
            groceryToComplete: groceryToComplete
        });
    }

    onDeleteSelected = (groceryToDelete) => {
        this.setState({
            isDeleteModal: true,
            groceryToDelete: groceryToDelete
        });
    }

    onDeleteConfirmed = () => {
        GroceriesAPI.delete(this.state.groceryToDelete)
            .then((res) => {
                let deletedGrocery = res.data;
                let groceries = this.state.myGroceries.filter(gro => gro._id !== deletedGrocery._id);
                this.setState({ myGroceries: groceries, groceryToDelete: null, isDeleteModal: false });
            });
    }

    onDeleteCanceled = () => {
        this.setState({ groceryToDelete: null, isDeleteModal: false });
    }


    saveRequest = (newRequest) => {
        GroceriesAPI.create(newRequest)
            .then(res => {
                let createdRequest = res.data;
                let myGroceries = this.state.myGroceries;
                myGroceries.push(createdRequest);
                this.setState({ myGroceries: myGroceries });
                this.submitButtonDelegate.clearHelpForm();
            });
    }

    // this method is a wrapper for the method onSubmitHelpForm from the HelpForm Component
    // For the Modal component to work properly, it needs to be defined outside
    // the HelpForm component. Since the buttons are defined outside the HelpForm component
    // we need to use an object to act as "delegate" to call the onSubmit from the HelpForm
    onSubmit = () => {
        if (this.submitButtonDelegate.onSubmit) {
            this.submitButtonDelegate.onSubmit();
        }
    }

    render() {

        return (
            <>
                <div className="row">
                    <div className="col s12">
                        <div id="helpFormRoot" className="container flat">
                                    <h3>Welcome, {this.state.user.firstName}</h3>
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col s12">
                        <div className="container">

                            <Profile
                                user={this.state.user}
                                handleEdit={this.handleEdit}
                            />
                        </div>
                    </div>


                </div>


                {/* Modal */}
                <div className="row">
                    <div className="col s12">
                        <div className="container">
                            {/* Modal needs to stay around the HelpForm, because it can be rendered (initialized) only once. If we define the Modal inside the HelpForm, every time we call setState on the HelpForm the Modal will be recreated and will no longer work properly (bug from react-materialize) */}
                            <ModalWrapper>
                                <Modal
                                    actions={[
                                        <Button flat modal="close" node="button" waves="green">Cancel</Button>,
                                        <Button flat modal="close" node="button" onClick={this.onSubmit} waves="green">Submit</Button>
                                    ]}
                                    bottomSheet={false}
                                    fixedFooter={false}
                                    header="Add a new request"
                                    open={false}
                                    options={{ dismissible: false }}
                                    root={document.getElementById('root')}
                                    trigger={<Button className="addRequestBtn btn-flat" node="button">Add new request</Button>}
                                >
                                    <HelpForm submitButtonDelegate={this.submitButtonDelegate} saveRequest={this.saveRequest} />
                                </Modal>
                            </ModalWrapper>

                        </div>

                    </div>
                </div>



                <div className="row">
                    <div className="col s12"> 
                        <div className="container">
                            {/* About user */}
                            <HelpCardList
                                user={this.state.user}
                                myGroceries={this.state.myGroceries}
                                myGroceriesHelper={this.state.myGroceriesHelper}
                                onCompleteSelected={this.onCompleteSelected}
                                handleDelete={this.handleDelete}
                                onDeleteSelected={this.onDeleteSelected}
                            />
                        </div>
                    </div>
                </div>
                {this.state.isCompletedModal &&

                    <ModalWrapper>
                        <Modal
                            actions={[
                                <Button flat modal="close" node="button" onClick={this.onCompleteCanceled} waves="green">Cancel</Button>,
                                <Button flat modal="close" node="button" onClick={this.onCompleteConfirmed} waves="green">Complete</Button>
                            ]}
                            bottomSheet={false}
                            fixedFooter={false}
                            header="Please confirm"
                            open={true}
                            options={{ dismissible: false }}
                            root={document.getElementById('root')}
                        >
                            Are you sure you want to complete this request: {this.state.groceryToComplete.groceries}? Once completed, it won't be visible to any helpers anymore.

                        </Modal>
                    </ModalWrapper>
                }

                {this.state.isDeleteModal &&

                    <ModalWrapper>
                        <Modal
                            actions={[
                                <Button flat modal="close" node="button" onClick={this.onDeleteCanceled} waves="green">Cancel</Button>,
                                <Button flat modal="close" node="button" onClick={this.onDeleteConfirmed} waves="green">Delete</Button>
                            ]}
                            bottomSheet={false}
                            fixedFooter={false}
                            header="Please confirm"
                            open={true}
                            options={{ dismissible: false }}
                            root={document.getElementById('root')}
                        >
                            Are you sure you want to delete this request: {this.state.groceryToDelete.groceries}? Once deleted, it will dissapear from your items list.

                        </Modal>
                    </ModalWrapper>
                }

                <FooterBar />
            </>
        )
    }
}

export default ProfileContainer;
