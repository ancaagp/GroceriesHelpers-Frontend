import React from 'react';
import './Main.css';
import UserAPI from '../../api/UserAPI';
import icon from './images/account (1).png';
import LabelConversion from '../Common/LabelConversion';

class HelpCardMain extends React.Component {
    state = {
        user: {},
    }

    // shouldComponentUpdate () {

    // }


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

    componentDidMount () {
        this.fetchRequestor();
    }

    componentDidUpdate () {
        this.fetchRequestor();
    }

    render() {
        return (
            <div className="help-card-main container">

                <ul className="collection">
                    <li className="collection-item avatar">
                        <img src={icon} alt="" className="circle" />
                        <span className="title">{this.state.user.firstName} {this.state.user.lastName}
                        <br />
                        {this.state.user.intro} 
                        <br />
                        {this.state.user.phoneNumber} 
                         </span>
                        <p>  {this.props.selectedGrocery.groceries}<br />
                        {this.props.selectedGrocery.address}
                        <br />  {this.props.selectedGrocery.description}<br />
                        {`I need this: ${LabelConversion.getTimeline(this.props.selectedGrocery.timeline)}`}
                        <br />
                        {`This request is: ${LabelConversion.getStatus(this.props.selectedGrocery.status)}`}
                        </p>
                        <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                        { this.props.selectedGrocery.status  === 'N' && this.props.selectedGrocery.requestor !== this.props.userId &&
                        <a onClick={this.props.onHelpSelected} className="waves-effect waves-light btn">I will help</a>
                        }
                        {this.props.selectedGrocery.status === 'P' && this.props.selectedGrocery.helper === this.props.userId &&
                            <a onClick={this.props.onHelpSelected} className="waves-effect waves-light btn disabled">I promised to help</a>
                        }

                    </li>
                </ul>

            </div>
        );
    }
}

export default HelpCardMain;