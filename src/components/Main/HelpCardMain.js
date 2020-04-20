import React from 'react';
import './Main.css';
import UserAPI from '../../api/UserAPI';
import image from '../Main/images/micheile-henderson-3TgIneA4xjM-unsplash.jpg';
import LabelConversion from '../Common/LabelConversion';
import Moment from 'moment';


class HelpCardMain extends React.Component {
    state = {
        user: {},
    }

    fetchRequestor() {
        if (this.props.selectedGrocery && this.state.user._id !== this.props.selectedGrocery.requestor) {
            UserAPI.getUser(this.props.selectedGrocery.requestor)
                .then((res) => {
                    this.setState({
                        user: res.data
                    });
                })
                .catch((err) => {
                    return err;
                })
        }
    }

    componentDidMount() {
        this.fetchRequestor();
    }

    componentDidUpdate() {
        this.fetchRequestor();
    }



    render() {

        const boldText = {
            fontSize: '18px'
        };

        const isMobile = window.innerWidth <= 500;

        return (
            <div className="help-card-main container">

                <div className="col s12 m7">
                    <h2 className="header">Selected groceries list</h2>
                    <div className="card horizontal">
                        {!isMobile &&
                            <div className="card-image">
                                <img src={image} />
                            </div>
                        }

                        <div className="card-stacked">

                            <div className="card-content">
                                <p>{`This request is: ${LabelConversion.getStatus(this.props.selectedGrocery.status)}`}</p>
                                <p>Groceries needed: {this.props.selectedGrocery.groceries}</p>
                                <br />
                                <p style={boldText}>Contact information:</p>
                                <p>This request was created by: {this.state.user.firstName} {this.state.user.lastName}</p>
                                {this.state.user.intro &&
                                    <p>About: {this.state.user.intro}</p>
                                }

                                <p>Phone number: {this.state.user.phoneNumber}</p>
                                <p>
                                    Delivery address: {this.props.selectedGrocery.address}
                                    <br />  Additional info: {this.props.selectedGrocery.description}<br />
                                    {`I need this: ${LabelConversion.getTimeline(this.props.selectedGrocery.timeline)}`}
                                    <br />

                                </p>
                                <p>Created on: {Moment(this.props.selectedGrocery.createdAt).format("MMMM Do YYYY, HH:mm")}</p>


                            </div>


                            <div className="card-action">
                                {this.props.selectedGrocery.status === "1" && this.props.selectedGrocery.requestor !== this.props.userId &&
                                    <a onClick={this.props.onHelpSelected} className="helpBtn btn-flat">I will help</a>
                                }
                                {this.props.selectedGrocery.status === "2" && this.props.selectedGrocery.helper === this.props.userId &&
                                    <a onClick={this.props.onHelpSelected} className="waves-effect waves-light btn disabled">I promised to help</a>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default HelpCardMain;